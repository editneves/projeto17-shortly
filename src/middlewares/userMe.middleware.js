import { db } from "../configs/database.js";

export async function validSchemaUserMe(req, res, next) {

    const authorization = req.headers.authorization;
    const resultado = authorization?.replace("Bearer ", "");
    const token = resultado.replace(/"/g, '')

    console.log(token)

    const tokenExist = await db.query('SELECT *FROM users WHERE token=$1', [token]);
    const userId = tokenExist.rows[0].userId;
    console.log(userId)


    res.locals.userId = userId;
    next();

}



