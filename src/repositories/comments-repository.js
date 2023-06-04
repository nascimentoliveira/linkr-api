import connectionDB from "../database/database.js"

async function createComment(postId, userId, comment) {
  return connectionDB.query(`
      INSERT INTO comments ("postId", "userId", comment)
      VALUES ($1, $2, $3);`,
    [postId, userId, comment],
  );
};

async function getComments(postId, userId) {
  return connectionDB.query(`
    SELECT 
      comments.id,
      users.username,
      users.picture,
      users.id AS "userId",
      comments.comment,
      (comments."userId"=posts."userId") AS "isAuthor",
      EXISTS (
        SELECT 1
        FROM followers
        WHERE followers."followerId"=$2
        AND followers."followedId"=users.id
      ) AS "follows"
    FROM comments
    JOIN users 
      ON comments."userId"=users.id
    JOIN posts
      ON comments."postId"=posts.id
    WHERE comments."postId"=$1
    ORDER BY comments."createdAt";`,
    [postId, userId],
  );
}

const commentsRepository = {
  createComment,
  getComments,
};

export default commentsRepository;
//
