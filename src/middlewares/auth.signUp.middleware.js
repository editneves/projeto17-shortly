import { db } from "../configs/database.js";
import { authSchemaSignUp } from "../schemas/auth.singUp.schema.js";

export async function validSchemaSignUp(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;

  const { error } = authSchemaSignUp.validate({
    name,
    email,
    password,
    confirmPassword,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }

  const emailExist = await db.query("SELECT * FROM user WHERE email=$1", [
    user.email,
  ]);

  if (emailExist.rowCount !== 0) return res.sendStatus(409);
// se a contagem de linhas for diferente de 0 teurn status 409, já cadastrado
  res.locals.signUp = signUp;

  next();
}
