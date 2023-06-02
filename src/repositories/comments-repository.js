import connectionDB from "../database/database.js"

async function createComment(postId, userId, comment) {
  return connectionDB.query(`
    WITH insertedComment AS (
      INSERT INTO comments ("postId", "userId", comment)
      VALUES ($1, $2, $3)
      RETURNING "postId"
    )
    SELECT json_agg(json_build_object(
        'id', comments.id,
        'username', users.username,
        'picture', users.picture,
        'userId', users.id,
        'comment', comments.comment,
        'isAuthor', (comments."userId"=posts."userId"),
        'follow', EXISTS (
          SELECT 1
          FROM followers
          WHERE followers."followerId"=$2
          AND followers."followedId"=users.id
        )
      ) ORDER BY comments."createdAt"
    ) AS comments
    FROM comments
    JOIN posts 
      ON comments."postId"=posts.id
    JOIN users 
      ON comments."userId"=users.id
    WHERE comments."postId"=(SELECT "postId" FROM insertedComment)
    GROUP BY posts.id;`,
    [postId, userId, comment],
  );
};

const commentsRepository = {
  createComment,
};

export default commentsRepository;
//
