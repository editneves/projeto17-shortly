import { Router } from "express";
import { signUp,signIn } from "../controllers/auth.controller.js";
import { validSchemasignIn } from "../middlewares/auth.signIn.middleware.js";
import { validSchemaSignUp } from "../middlewares/auth.signUp.middleware.js";

const authRouter = Router();

authRouter.post("/signup", validSchemasignIn, signUp);
authRouter.post("/signin", validSchemaSignUp, signIn);
export default authRouter;
