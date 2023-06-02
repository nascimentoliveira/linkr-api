import connectionDB from "../database/database.js"

async function getUserById(userId) {
  return connectionDB.query(`
    SELECT * 
    FROM users 
    WHERE id=$1;`,
    [userId],
  );
}

async function getUserByEmail(email) {
  return connectionDB.query(`
    SELECT * 
    FROM users 
    WHERE email=$1;`,
    [email],
  );
}

async function getUserBySession(sessionId) {
  return connectionDB.query(`
    SELECT users.* 
    FROM sessions
    JOIN users
      ON sessions."userId"=users.id
    WHERE sessions.id=$1;`,
    [sessionId],
  );
}

async function createUser(username, email, password, picture) {
  return connectionDB.query(`
    INSERT INTO users(username, email, password, picture)
    VALUES ($1, $2, $3, $4);`,
    [username, email, password, picture],
  );
}

async function createSession(userId) {
  return connectionDB.query(`
    INSERT INTO sessions("userId")
    VALUES ($1) 
    RETURNING id;`,
    [userId]
  );
}

async function searchUser(username) {
  return connectionDB.query(`
    SELECT id, picture, username
    FROM users 
    WHERE username
    ILIKE $1;`,
    [`${username}%`],
  );
}

const usersRepository = {
  getUserById,
  getUserByEmail,
  getUserBySession,
  createUser,
  createSession,
  searchUser,
};

export default usersRepository;
//
