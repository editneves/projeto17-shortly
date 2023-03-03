import { db } from "../configs/database.js";
import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = res.locals.signUp;
  const passwordHashed = bcrypt.hashSync(password, 10);

  try {

    await db.query(
      `
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3);
    `,
      [name, email, passwordHashed]
    );

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function signIn(req, res) {
  const { email } = res.locals.signIn;

  try {
    const token = uuidV4();
    await db.query(
      `
      UPDATE "users" 
      SET "token" = $2 
      WHERE "email" = $1;
      `, [email, token]
    );
    return res.status(200).send({ token: token });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function usersMe(req, res) {
  const userId = res.locals.userId;

  try {
    const countId = await db.query('SELECT Count(*) FROM urls WHERE "userId"=$1', [userId]);
    const visitCount = countId.rows[0].count
    console.log(countId)
    const dados = await db.query('SELECT * FROM urls WHERE "userId"=$1', [userId]);
    const linkCount = await db.query('SELECT Count(*) FROM urls WHERE "userId"=$1', [userId]);
    const id = userId;
    const dados2 = await db.query('SELECT * FROM users WHERE "id"=$1', [id]);

    res.status(200).send({
      "id": id,
      "name": dados2.rows[0].name,
      "visitCount": visitCount,
      "shortenedUrls": {
        "id": userId,
        "shortUrl": dados.rows[0].shortUrl,
        "url": dados.rows[0].url,
        "visitCount": linkCount.rows[0].count
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function ranking(req, res) {
  try {
  
    const dados = await db.query('SELECT * FROM urls');
    const dados2 = await db.query('SELECT * FROM users');
    const soma = await db.query('SELECT SUM(urls.visits) FROM urls ');
    const userId = dados.rows[0].userId
    const countId = await db.query('SELECT Count(*) FROM urls WHERE "userId"=$1', [userId]);
    const visitCount = countId.rows[0].count
    console.log(visitCount)
    res.status(200).send({
      "id": dados2.rows[0].id,
      "name": dados2.rows[0].name,
      "linksCount": soma.rows[0].sum,
      "visitCount": visitCount
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
}


// "id": dados2.rows[0].id,
//       "name": dados2.rows[0].name
//       "linksCount": linkCount.rows[0].count,
// 		"visitCount": visitCount
//       // "visitCount": visitCount,
//       // "shortenedUrls": {
//       //   "id": userId,
//       //   "shortUrl": dados.rows[0].shortUrl,
//       //   "url": dados.rows[0].url,
//       //   "visitCount": linkCount.rows[0].count
//       // }

// "id": id do usuário,
// 	"name": nome do usuário,
// 	"visitCount": soma da quantidade de visitas de todos os links do usuário,
// 	"shortenedUrls":