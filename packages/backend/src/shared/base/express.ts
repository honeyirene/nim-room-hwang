import yup = require('yup');;
import express from 'express';
import { Protocol } from '@nrh/protocols';
import { TypedSchema } from 'yup/lib/util/types';
import { Api } from './api';
import { SchemaObjectDescription } from 'yup/lib/schema';

type ExpressHandler = (req: express.Request, res: express.Response) => Promise<void>;

type SyncApiHandler<Req extends object, Resp> = (
	body: Req,
) => Promise<Resp>;

export function registerProtocol<T>(
	router: express.Router,
	protocol: T,
	api: Api<T>,
) {
	for (const key of Object.keys(protocol)) {
		const fn = api[key as keyof typeof api];
		const p = protocol[key as keyof typeof api];
		registerSyncApi(router, p as any, fn);
	}
}

function registerSyncApi<Req extends object, Resp, Schema extends TypedSchema>(
	router: express.Router,
	protocol: Protocol<Req, Resp, Schema>,
	fn: SyncApiHandler<Req, Resp>,
) {
	const { method, page } = protocol;
	router[method](page, handleSyncApi<Req, Resp, Schema>({
		fn,
		schema: protocol.schema as Schema,
	}));
}

const handleSyncApi = <Req extends object, Resp, Schema extends TypedSchema>(params: {
	fn: SyncApiHandler<Req, Resp>,
	schema: Schema,
}): ExpressHandler => {
	const {
		fn,
	} = params;

	const schema = params.schema as any as yup.BaseSchema<Req>;

	return async (req: express.Request, res: express.Response) => {
		const body = await validateSchema(req, schema);
		const data = await onHandleSyncApi({ fn, body });
		writeJson(res, data);
	};
};

const onHandleSyncApi = async <Req extends object, Resp>(params: {
	fn: SyncApiHandler<Req, Resp>,
	body: Req,
}) => {
	const { fn, body } = params;
	const resp: Resp = await fn(body);
	return resp;
};

export async function validateSchema<T extends object>(
	req: express.Request,
	schema: yup.BaseSchema<T>,
): Promise<T> {
	const raw = createRawInput(req, schema);

	const body = await schema.validate(raw);
	return body;
}

function createRawInput<T extends object>(
	req: express.Request,
	schema: yup.BaseSchema<T>,
) {
	if (Array.isArray(req.body)) {
		const raw = req.body;
		return raw;

	} else {
		const raw = {
			...req.params,
			...req.query,
			...req.body,
		};

		if (schema.type !== 'object') {
			throw new Error();
		}
		const description = schema.describe() as SchemaObjectDescription;
		const fields = description.fields;
		const entries = Object.entries(fields);

		// query string으로 크기 1인 배열을 넘기면
		// express.req로는 배열인지 문자열인지 구분할 수 없다
		// schema 열어서 배열이면 적당히 변환
		for (const [key, desc] of entries) {
			const value = raw[key];
			if (desc.type === 'array') {
				if (typeof value === 'string') {
					raw[key] = [value];
				}
			}
		}

		// query string + nullable integer 대응
		// query string은 문자열이라서 "null" 넣어봤자
		// yup에서 파싱하다 터져서 NaN으로 튀어나온다. 명시적으로 바꾸기
		for (const [key, desc] of entries) {
			const value = raw[key];
			if (desc.type === 'number') {
				if (value === 'null') {
					raw[key] = null;
				} else if (value === '') {
					raw[key] = null;
				}
			}
		}

		return raw;
	}
}

function writeJson<T>(res: express.Response, resp: T) {
	res.type('application/json').send(JSON.stringify(resp, null, 2));
}
