import express from 'express';
import { sampleProtocol } from 'packages/protocols/src';
import { registerProtocol } from '../../shared';
import { SampleApi } from "../apis";

const router = express.Router();

const api = new SampleApi();
registerProtocol(router, sampleProtocol, api);

export const sampleRouter = router;
