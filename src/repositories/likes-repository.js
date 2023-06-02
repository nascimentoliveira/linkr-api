import connectionDB from "../database/database.js"

async function like(userId, postId) {
  return connectionDB.query(`
    INSERT INTO likes("userId", "postId")
    VALUES ($1, $2);`,
    [userId, postId],
  );
}

async function unlike(userId, postId) {
  return connectionDB.query(`
    DELETE FROM likes
    WHERE "userId"=$1 AND "postId"=$2;`,
    [userId, postId],
  );
}

async function getLikes(userId, postId) {
  return connectionDB.query(`
    SELECT
      (SELECT COUNT(*) FROM likes WHERE "postId"=$2) AS likes,
      EXISTS (
        SELECT 1
        FROM likes
        WHERE "postId"=$2 AND "userId"=$1
      ) AS liked,
      COALESCE((
        SELECT json_agg(users.username) 
        FROM likes 
        JOIN users 
          ON likes."userId"=users.id 
        WHERE likes."postId"=$2 AND likes."userId"<>$1 
        LIMIT 3),'[]'::json
      ) AS likers;`,
    [userId, postId],
  );
}

async function checkLiked(userId, postId) {
  return connectionDB.query(`
    SELECT *
    FROM likes
    WHERE likes."userId"=$1 AND likes."postId"=$2;`,
    [userId, postId],
  );
}

const likesRepository = {
  like,
  unlike,
  getLikes,
  checkLiked,
}

export default likesRepository;
//
