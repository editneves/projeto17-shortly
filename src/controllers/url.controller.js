import { nanoid } from 'nanoid'
import { db } from "../configs/database.js";

export async function url(req, res) {
    const {url} = req.body;
    const userId = res.locals.userId;
    const shortUrl = nanoid(8);
    
    try {
        await db.query(
            `
          INSERT INTO urls ("shortUrl", url,"userId") 
          VALUES ($1, $2, $3);
          `,
            [shortUrl, url, userId]
        );
        const IdUrl = await db.query('SELECT * FROM urls WHERE url=$1', [url]);

        res.status(201).send({
            "id": IdUrl.rows[0].id,
            "shortUrl": shortUrl
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function listUrl(req, res) {
    const id = Number(req.params.id);

    try {
        const urlExist = await db.query('SELECT "id", "shortUrl", "url" FROM urls WHERE id=$1', [id]);
        if (!urlExist.rowCount > 0) return res.sendStatus(404);
        res.status(200).send(urlExist.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
//Aumentar um na contagem de visitas do link.
export async function redirectUrl(req, res) {
    const shortUrl = req.params.shortUrl;
   
    try {
        const shortUrlExist = await db.query('SELECT *FROM "urls" WHERE "shortUrl"=$1', [shortUrl]);
        if (shortUrlExist.rowCount < 0) return res.sendStatus(404);
       // const quantidade = await db.query('SELECT COUNT(url) FROM "urls" WHERE url =$1', [shortUrlExist.rows[0].url]);
        //console.log(quantidade)
        res.redirect(shortUrlExist.rows[0].url)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteUrl(req, res) {
    //const { id } = req.params;
    const id = res.locals.id;
    console.log(id)
    try {
        await db.query('UPDATE "urls" SET "shortUrl" = $1  WHERE "id" = $2', [null, id]);
        // const urlExist = await db.query('SELECT *FROM "urls" WHERE "id"=$1', [id]);
        // console.log(shortUrlExist,urlExist)
       
        // if (shortUrlExist.rowCount < 0) return res.sendStatus(404);
       // const quantidade = await db.query('SELECT COUNT(url) FROM "urls" WHERE url =$1', [shortUrlExist.rows[0].url]);
        //console.log(quantidade)
        res.status(204)
    } catch (error) {
        res.status(500).send(error.message);
    }
}
