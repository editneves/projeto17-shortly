import { db } from "../configs/database.js";
import bcrypt from "bcrypt";
import { authSchemaSignIn } from "../schemas/auth.singIn.schema.js";

export async function validSchemasignIn(req, res, next) {
  const signIn = req.body;
  //{ email, password }

  const { error } = authSchemaSignIn.validate(signIn);

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }

  const checkUser = await db.query("SELECT * FROM users WHERE email=$1", [
    signIn.email,
  ]);

  // const { rows, rowCount } = await db.query('SELECT * FROM users WHERE email=$1', [signIn.email])
  // console.log("1",rows[0],rowCount)

  if (checkUser.rowCount === 0) return res.sendStatus(401);
  // // se a contagem de linhas for igual a 0 return status 401, usuario ou senha não existem

  const isCorrectPassword = bcrypt.compareSync(
    signIn.password,
    checkUser.rows[0].password
  );
  if (!isCorrectPassword) {
    return res.status(401).send("Usuário ou senha incorretos");
  }
  if (isCorrectPassword) {
    res.locals.signIn = signIn;

    next();
  }
}
