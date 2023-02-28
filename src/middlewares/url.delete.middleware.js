import { db } from "../configs/database.js";

export async function validSchemaUrlDelete(req, res, next) {
    const { id } = req.params;
    const authorization = req.headers.authorization;
    const resultado = authorization?.replace("Bearer ", "");
    const token = resultado.replace(/"/g, '')

    console.log(token)

    // - Caso o *header* não seja enviado ou seja inválido, responder com *status code* `401`.
    // - Deve responder com *status code* `401` quando a url encurtada não pertencer ao usuário.
    // - Se a url for do usuário, deve responder com *status code* `204` e excluir a url encurtada.
    // - Caso a url encurtada não exista, responder com *status code* `404`


    //     //- Deve responder com *status code* `401` quando a url encurtada não pertencer ao usuário.
    // // colocar na tabela urls Id_users
    // // com o token descubro o Id_users associado ao token 
    // // e comparo com o Id_users da tabela urls 


    // if (!authorization) { return res.status(401) }
    const tokenExist = await db.query('SELECT *FROM users WHERE token=$1', [token]);
    const idUser = tokenExist.rows[0].id;
    const userIdUrlsExist = await db.query('SELECT *FROM "urls" WHERE id=$1', [id]);
    const idUserUrls = userIdUrlsExist.rows[0].userId;
    const token2 = tokenExist.rows[0].token;
    if (token2 !== token || token2 === 0) return res.sendStatus(401);
    
    if (idUser === idUserUrls) {
    const shortUrl = userIdUrlsExist.rows[0].shortUrl

    res.locals.id = id;
    next();
    return res.sendStatus(204);
    
    }


   
}