import { db } from "../configs/database.js";
import { urlSchema } from "../schemas/url.schema.js";

export async function validSchemaUrl(req, res, next) {
    const url = req.body;

    const authorization = req.headers.authorization;
    const resultado = authorization?.replace("Bearer ", "");
    const token = resultado.replace(/"/g, '')

    if (!token) { return res.status(401) }
    //- Deve responder com *status code* `401` quando a url encurtada não pertencer ao usuário.
// colocar na tabela urls Id_users
// com o token descubro o Id_users associado ao token 
// e comparo com o Id_users da tabela urls 

   

    const tokenExist = await db.query('SELECT *FROM users WHERE token=$1', [token]);
    const token2 = tokenExist.rows[0].token;
    //console.log(tokenExist.rows[0].token)
    if (token2 !== token || token2 === 0) return res.sendStatus(401);
    // // se a contagem de linhas for diferente de 0 teurn status 409, já cadastrado
    res.locals.url = url;

    next();
}