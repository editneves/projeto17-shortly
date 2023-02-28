import { Router } from "express";
import { url , listUrl, redirectUrl, deleteUrl} from "../controllers/url.controller.js";
import { validSchemaUrl} from "../middlewares/url.middleware.js";
import { validSchemaUrlDelete} from "../middlewares/url.delete.middleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validSchemaUrl, url);
urlRouter.get("/urls/:id",  listUrl);
urlRouter.get("/urls/open/:shortUrl",  redirectUrl);
urlRouter.delete("/urls/:id", validSchemaUrlDelete, deleteUrl);


export default urlRouter;
