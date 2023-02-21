import { db } from "../configs/database.js";
import { authSchemaSignIn } from "../schemas/auth.singIn.schema.js";

export async function validSchemasignIn(req, res, next) {
  const { email, password } = req.body;

  const { error } = authSchemaSignIn.validate({
    email,
    password,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }

  const checkUser = await db.query("SELECT * FROM signIn WHERE email=$1", [
    signUp.email,
  ]);

  if (checkUser.rowCount !== 0) return res.sendStatus(401);

  const isCorrectPassword = bcrypt.compareSync(password, checkUser.password);

  if (!isCorrectPassword)
    return res.status(401).send("Usuário ou senha incorretos");

  res.locals.signIn = signIn;

  next();
}
