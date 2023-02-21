import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use([authRouter]);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor funcionando na porta: ${PORT}`));
