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

  const emailExist = await db.query("SELECT * FROM signUp WHERE email=$1", [
    signUp.email,
  ]);

  if (emailExist.rowCount !== 0) return res.sendStatus(409);

  res.locals.signUp = signUp;

  next();
}
