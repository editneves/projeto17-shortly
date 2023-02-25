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
        const gameExist = await db.query('SELECT * FROM urls WHERE id=$1', [id]);
        res.status(200).send(gameExist.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
} 