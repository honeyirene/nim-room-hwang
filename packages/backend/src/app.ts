import express from 'express';
import { sampleRouter } from './sample';

const app = express();
const router = express.Router();

router.use('/', sampleRouter);

app.use(router);

export default app;
