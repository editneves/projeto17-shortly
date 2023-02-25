import { nanoid } from 'nanoid'
import { db } from "../configs/database.js";

export async function url(req, res) {
    const { url } = res.locals.url;
    const shortUrl = nanoid(8);
    const text = '';
    // generateCode()
    // function generateCode() {
    //    console.log("a")
    //     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++)
    //         text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     return text;
    // }

    try {
        await db.query(
            `
          INSERT INTO urls ("shortUrl", url, "shortenedUrls") 
          VALUES ($1, $2, $3);
          `,
            [shortUrl, url, text ]
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
        res.status(200).send(urlExist.rows[0]);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function redirectUrl(req, res) {
    const id = Number(req.params.id);

    try {
        const urlExist = await db.query('SELECT * FROM urls WHERE id=$1', [id]);
        if (!urlExist.rowCount > 0) return res.sendStatus(404);
        res.status(200).send(urlExist.rows[0]);
        res.redirect(url)
    } catch (error) {
        res.status(500).send(error.message);
    }
} 
