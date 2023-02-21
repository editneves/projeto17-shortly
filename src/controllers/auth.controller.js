import { db } from "../configs/database.js";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  const passwordHashed = bcrypt.hashSync(password, 10);

  try {
    await db.query(
      `
    INSERT INTO user (name, email, passwordHashed) 
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
  const { email, password } = req.body;

  try {
    const token = uuidV4();
    console.log(token);

    await db.query(
      `
      UPDATE "user" SET token = 'token' WHERE email=('$1');
      `,
      [token]
    );
    
    return res.status(200).send(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
