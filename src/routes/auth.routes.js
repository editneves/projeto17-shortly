import { Router } from "express";
import { signUp,signIn , usersMe} from "../controllers/auth.controller.js";
import { validSchemasignIn } from "../middlewares/auth.signIn.middleware.js";
import { validSchemaSignUp } from "../middlewares/auth.signUp.middleware.js";
import { validSchemaUrlUserMe } from "../middlewares/userMe.middleware.js";


const authRouter = Router();

authRouter.post("/signup", validSchemaSignUp, signUp);
authRouter.post("/signin", validSchemasignIn, signIn);
authRouter.post("/users/me", validSchemaUrlUserMe, usersMe);

export default authRouter;
