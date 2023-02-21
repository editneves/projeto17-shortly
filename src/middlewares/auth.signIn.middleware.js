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

  const checkUser = await db.query("SELECT * FROM user WHERE email=$1", [
    user.email,
  ]);
  
  if (checkUser.rowCount === 0) return res.sendStatus(401);
// se a contagem de linhas for igual a 0 return status 401, usuario ou senha não existem
  const isCorrectPassword = bcrypt.compareSync(password, checkUser.password);

  if (!isCorrectPassword)
    return res.status(401).send("Usuário ou senha incorretos");

  res.locals.signIn = signIn;

  next();
}
