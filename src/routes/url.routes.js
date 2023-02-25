import { Router } from "express";
import { url , listUrl} from "../controllers/url.controller.js";
import { validSchemaUrl } from "../middlewares/url.middleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validSchemaUrl, url);
urlRouter.get("/urls/:id",  listUrl);


export default urlRouter;
