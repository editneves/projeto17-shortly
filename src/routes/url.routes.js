import { Router } from "express";
import { url } from "../controllers/url.controller.js";
import { validSchemaUrl } from "../middlewares/url.middleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validSchemaUrl, url);

export default urlRouter;
