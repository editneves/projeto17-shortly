import { db } from "../configs/database.js";
import { urlSchema } from "../schemas/url.schema.js";

export async function validSchemaUrl(req, res, next) {
  const url = req.body;
  const authorization = req.headers.authorization;
  const resultado = authorization?.replace("Bearer ", "" );
  const token = resultado.replace(/"/g, '')
  const { error } = urlSchema.validate(url);
 
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }

  const tokenExist = await db.query('SELECT *FROM users WHERE token=$1', [token]);
  const token2= tokenExist.rows[0].token;
  const userId= tokenExist.rows[0].id;
 
  if (token2 !== token || token2 === 0) return res.sendStatus(401);
  // // se a contagem de linhas for diferente de 0 teurn status 409, já cadastrado
  
  res.locals.userId = userId;
  next();
}
