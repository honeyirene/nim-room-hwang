import express = require('express');
import { SampleApi } from "../apis";

const router = express.Router();

const api = new SampleApi();

export const sampleRouter = router;
