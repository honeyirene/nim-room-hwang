import express from 'express';
import { resource_sample } from '@nrh/protocols';
import { sampleRouter } from './sample';

const app = express();
const router = express.Router();

router.use(resource_sample, sampleRouter);

app.use(router);

export default app;
