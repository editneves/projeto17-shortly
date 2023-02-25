import { nanoid } from 'nanoid'
import { db } from "../configs/database.js";

export async function url(req, res) {
    const { url } = res.locals.url;

    try {
        await db.query(
            `
          INSERT INTO urls (url) 
          VALUES ($1);
          `,
            [url]
        );
        const IdUrl = await db.query('SELECT * FROM urls WHERE url=$1', [url]);

        res.status(201).send({
            "id": IdUrl.rows[0].id,
            "shortUrl": nanoid(8)
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


//model.id = nanoid() 