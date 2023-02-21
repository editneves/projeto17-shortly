import { db } from "../configs/database.js";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  const passwordHashed = bcrypt.hashSync(password, 10);

  try {
    await db.query(
      `
    INSERT INTO signup (name, email, passwordHashed) 
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
    INSERT INTO signip (idUsuario: checkUser._id,token: "token") 
    VALUES ($1, $2);
    `,
      [idUsuario, token]
    );

    return res.status(200).send(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
