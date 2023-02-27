import { nanoid } from 'nanoid'
import { db } from "../configs/database.js";

export async function url(req, res) {
    const { url } = res.locals.url;
    const shortUrl = nanoid(8);

    try {
        await db.query(
            `
          INSERT INTO urls ("shortUrl", url) 
          VALUES ($1, $2);
          `,
            [shortUrl, url]
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
        const urlExist = await db.query('SELECT * FROM urls WHERE id=$1', [id]);
        if (!urlExist.rowCount > 0) return res.sendStatus(404);
        res.status(200).send(urlExist.rows[0].id);

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
        res.redirect(shortUrlExist.rows[0].url)
    } catch (error) {
        res.status(500).send(error.message);
    }
}


