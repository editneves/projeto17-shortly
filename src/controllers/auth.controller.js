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
  
  //const userId = userMe.userId
  console.log("esse",userId)
  try {
    const visitCount = await db.query('SELECT *FROM urls WHERE "userId"=$1', [userId]);
    const dados = visitCount.rows[0];
    

      // const urlExist = await db.query('SELECT "id", "name", "visitCount" FROM users WHERE id=$1', [id]);
      // if (!urlExist.rowCount > 0) return res.sendStatus(404);
      // res.status(200).send(urlExist.rows[0]);

  } catch (error) {
      res.status(500).send(error.message);
  }
}




// "id": id do usuário,
// 	"name": nome do usuário,
// 	"visitCount": soma da quantidade de visitas de todos os links do usuário,
// 	"shortenedUrls":