import connectionDB from "../database/database.js"

async function insertUrl(url, title, image, description) {
  return connectionDB.query(`
    WITH "insertedUrl" AS (
      INSERT INTO urls (url, title, image, description)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (url) DO NOTHING
      RETURNING id
    )
    SELECT id 
    FROM "insertedUrl"
    UNION ALL
    SELECT id 
    FROM urls
    WHERE url=$1;`,
    [url, title, image, description],
  );
}

async function createPost(userId, urlId, text) {
  return connectionDB.query(`
    INSERT INTO  posts("userId", "urlId", "text")
    VALUES ($1, $2, $3)
    RETURNING id;`,
    [userId, urlId, text],
  );
}

async function getPosts(userId, offset, more) {
  return connectionDB.query(`
    SELECT
      posts.id,
      users.id AS "userId",
      users.username,
      users.picture,
      posts.text,
      json_build_object(
        'url', urls.url,
        'title', urls.title,
        'image', urls.image,
        'description', urls.description
      ) AS link,
      (SELECT COUNT(*) FROM likes WHERE likes."postId"=posts.id) AS likes,
      EXISTS (
        SELECT 1
        FROM likes
        WHERE likes."postId"=posts.id
        AND likes."userId"=$1
      ) AS liked,
      COALESCE((
        SELECT json_agg(users.username)
        FROM likes
        JOIN users 
          ON likes."userId"=users.id AND likes."userId"<>$1
        WHERE likes."postId"=posts.id
        LIMIT 4
      ), '[]'::json) AS likers,
      COALESCE((
        SELECT json_agg(comments_data)
        FROM (
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
              WHERE followers."followerId"=$1
              AND followers."followedId"=users.id
            ) AS "follow"
          FROM comments
          JOIN users 
            ON comments."userId"=users.id
          WHERE comments."postId"=posts.id
          ORDER BY comments."createdAt"
        ) AS comments_data
      ), '[]'::json) AS comments
    FROM posts
    JOIN urls 
      ON posts."urlId"=urls.id
    JOIN users 
      ON posts."userId"=users.id
    LEFT JOIN followers 
      ON followers."followedId"=users.id
    WHERE (followers."followerId"=$1 OR users.id=$1)
    GROUP BY posts.id, users.id, urls.id
    ORDER BY posts."createdAt" DESC
    OFFSET $2
    LIMIT $3;`,
    [userId, offset, more],
  );
}

async function getMorePosts(userId, lastRefresh) {
  return connectionDB.query(`
    SELECT
      posts.id,
      users.id AS "userId",
      users.username,
      users.picture,
      posts.text,
      json_build_object(
        'url', urls.url,
        'title', urls.title,
        'image', urls.image,
        'description', urls.description
      ) AS link,
      (SELECT COUNT(*) FROM likes WHERE likes."postId"=posts.id) AS likes,
      EXISTS (
        SELECT 1
        FROM likes
        WHERE likes."postId"=posts.id
        AND likes."userId"=$1
      ) AS liked,
      COALESCE((
        SELECT json_agg(users.username)
        FROM likes
        JOIN users 
          ON likes."userId"=users.id AND likes."userId"<>$1
        WHERE likes."postId"=posts.id
        LIMIT 4
      ), '[]'::json) AS likers,
      COALESCE((
        SELECT json_agg(comments_data)
        FROM (
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
              WHERE followers."followerId"=$1
              AND followers."followedId"=users.id
            ) AS "follow"
          FROM comments
          JOIN users 
            ON comments."userId"=users.id
          WHERE comments."postId"=posts.id
          ORDER BY comments."createdAt"
        ) AS comments_data
      ), '[]'::json) AS comments
    FROM posts
    JOIN urls 
      ON posts."urlId"=urls.id
    JOIN users 
      ON posts."userId"=users.id
    LEFT JOIN followers 
      ON followers."followedId"=users.id
    WHERE (followers."followerId"=$1 OR users.id=$1) AND (posts."createdAt">$2)
    GROUP BY posts.id, users.id, urls.id
    ORDER BY posts."createdAt" DESC;`,
    [userId, lastRefresh],
  );
}

async function getUserPosts(userId, userParamId, offset, more) {
  return connectionDB.query(`
    SELECT
      posts.id,
      users.id AS "userId",
      users.username,
      users.picture,
      posts.text,
      json_build_object(
        'url', urls.url,
        'title', urls.title,
        'image', urls.image,
        'description', urls.description
      ) AS link,
      (SELECT COUNT(*) FROM likes WHERE likes."postId"=posts.id) AS likes,
      EXISTS (
        SELECT 1
        FROM likes
        WHERE likes."postId"=posts.id
        AND likes."userId"=$1
      ) AS liked,
      COALESCE((
        SELECT json_agg(users.username)
        FROM likes
        JOIN users 
          ON likes."userId"=users.id AND likes."userId"<>$1
        WHERE likes."postId"=posts.id
        LIMIT 4
      ), '[]'::json) AS likers,
      COALESCE((
        SELECT json_agg(comments_data)
        FROM (
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
              WHERE followers."followerId"=$1
              AND followers."followedId"=users.id
            ) AS "follow"
          FROM comments
          JOIN users 
            ON comments."userId"=users.id
          WHERE comments."postId"=posts.id
          ORDER BY comments."createdAt"
        ) AS comments_data
      ), '[]'::json) AS comments
    FROM posts
    JOIN urls 
      ON posts."urlId"=urls.id
    JOIN users 
      ON posts."userId"=users.id
    WHERE users.id=$2
    GROUP BY posts.id, users.id, urls.id
    ORDER BY posts."createdAt"
    OFFSET $3
    LIMIT $4;`,
    [userId, userParamId, offset, more],
  );
}

async function getPostById(postId) {
  return connectionDB.query(`
    SELECT *
    FROM posts
    WHERE id=$1;`,
    [postId]
  );
}

async function deletePost(postId) {
  return connectionDB.query(`
    DELETE FROM posts 
    WHERE id=$1;`,
    [postId],
  );
}

async function editPost(newText, postId) {
  return connectionDB.query(`
    UPDATE posts 
    SET text=$1
    WHERE id=$2
    RETURNING text;`,
    [newText, postId],
  );
}

const postsRepository = {
  insertUrl,
  createPost,
  getPosts,
  getUserPosts,
  getPostById,
  deletePost,
  editPost,
  getMorePosts,
};

export default postsRepository;
