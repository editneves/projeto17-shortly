import { db } from "../configs/database.js";
import { urlSchema } from "../schemas/url.schema.js";

export async function validSchemaUrl(req, res, next) {
  const url = req.body;
  const authorization = req.headers.authorization;
  const resultado = authorization?.replace("Bearer ", "");
  const token = resultado.replace(/"/g, '')
  const { error } = urlSchema.validate(url);

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }
  const tokenExist = await db.query('SELECT *FROM users WHERE token=$1', [token]);
  //console.log(tokenExist.rows[0].token)
  if (tokenExist.rows[0].token !== token || tokenExist.rows[0].token === 0) return res.sendStatus(401);

  res.locals.url = url;

  next();
}
