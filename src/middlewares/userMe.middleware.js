import { db } from "../configs/database.js";

export async function validSchemaUrlUserMe(req, res, next) {

    const authorization = req.headers.authorization;
    const resultado = authorization?.replace("Bearer ", "");
    const token = resultado.replace(/"/g, '')

    console.log(token)

    const tokenExist = await db.query('SELECT *FROM users WHERE token=$1', [token]);
    const userId = tokenExist.rows[0].userId;
    console.log(userId)

    // const userIdUrlsExist = await db.query('SELECT *FROM "urls" WHERE id=$1', [id]);
    // const idUserUrls = userIdUrlsExist.rows[0].userId;
    // const token2 = tokenExist.rows[0].token;
    // if (token2 !== token || token2 === 0) return res.sendStatus(401);

    // if (idUser === idUserUrls) {
    // const shortUrl = userIdUrlsExist.rows[0].shortUrl

    res.locals.userId = userId;
    next();
    return res.sendStatus(204);

}



