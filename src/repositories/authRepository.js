import connectionDB from "../database/database.js"

async function getUserByEmail(email) {
  return connectionDB.query(`
    SELECT 
      * 
    FROM 
      users 
    WHERE 
      email=$1`,
    [email]
  );
}

async function getUserBySession(id) {
  return connectionDB.query(`
    SELECT 
      u.* 
    FROM 
      sessions AS s
    JOIN 
      users AS u
    ON 
      s."userId"=u.id
    WHERE 
      s.id=$1`,
    [id]
  );
}


async function newUser(name, email, password, picture) {
  return connectionDB.query(`
    INSERT INTO 
      users(username, email, password, picture)
    VALUES 
      ($1, $2, $3, $4)`,
    [name, email, password, picture]
  );
}

async function newSession(userId) {
  return connectionDB.query(`
    INSERT INTO 
      sessions("userId")
    VALUES 
      ($1) 
    RETURNING 
      id`,
    [userId]
  );
}


export const authRepository = {
  getUserByEmail,
  getUserBySession,
  newUser,
  newSession
};