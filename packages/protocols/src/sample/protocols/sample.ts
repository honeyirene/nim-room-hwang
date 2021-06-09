import { DatabaseConnectionMode, Protocol } from "../../common";
import yup from 'yup';

const resource = 'api/sample';
export const resource_sample = resource;

interface SampleReq {
	a: string;
	b: number;
}

const sampleSchema = yup.object({
	a: yup.string().required(),
	b: yup.number().required(),
});

interface SampleResp {
	result: string;
}

const sample: Protocol<SampleReq, SampleResp, typeof sampleSchema> = {
	method: 'post',
	resource,
	page: '/',
	schema: sampleSchema,
	db: DatabaseConnectionMode.NO_DB,
};

export const sampleProtocol = {
	sample,
};
