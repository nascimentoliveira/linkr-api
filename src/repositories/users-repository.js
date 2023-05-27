import connectionDB from "../database/database.js"

async function getUserByEmail(email) {
  return connectionDB.query(`
    SELECT 
      * 
    FROM 
      users 
    WHERE 
      email=$1;`,
    [email],
  );
}

async function getUserBySession(sessionId) {
  return connectionDB.query(`
    SELECT 
      users.* 
    FROM 
      sessions
    JOIN 
      users
    ON 
      session."userId"=users.id
    WHERE 
      session.id=$1;`,
    [sessionId],
  );
}

async function createUser(name, email, password, picture) {
  return connectionDB.query(`
    INSERT INTO 
      users(username, email, password, picture)
    VALUES 
      ($1, $2, $3, $4);`,
    [name, email, password, picture],
  );
}

async function createSession(userId) {
  return connectionDB.query(`
    INSERT INTO 
      sessions("userId")
    VALUES 
      ($1) 
    RETURNING 
      id;`,
    [userId]
  );
}

async function searchUser(username) {
  return connectionDB.query(`
    SELECT 
      id, picture, username
    FROM 
      users 
    WHERE username
    ILIKE $1;`,
    [`${username}%`],
  );
}

async function checkFollow(followerId, followedId) {
  return connectionDB.query(`
    SELECT 
      * 
    FROM 
      followers 
    WHERE 
      "followerId"=$1 AND "followedId"=$2;`,
    [followerId, followedId],
  );
}

const usersRepository = {
  getUserByEmail,
  getUserBySession,
  createUser,
  createSession,
  searchUser,
  checkFollow,
};

export default usersRepository;
//
