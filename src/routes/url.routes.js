import { Router } from "express";
import { url , listUrl, redirectUrl} from "../controllers/url.controller.js";
import { validSchemaUrl } from "../middlewares/url.middleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validSchemaUrl, url);
urlRouter.get("/urls/:id",  listUrl);
urlRouter.get("/urls/open/:shortUrl",  redirectUrl);



export default urlRouter;
