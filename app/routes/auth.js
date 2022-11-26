import express from "express";
import {output} from "../controllers/auth.mjs";

const router = express.Router();

router.post("/output", output);
export default router;

//this is for the creation of routes