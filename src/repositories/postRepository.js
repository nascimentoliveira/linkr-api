import db from '../database/db.js';

async function insertUrl(url, title, image, description) {
  return db.query(
    `
    INSERT INTO 
      urls (url, title, image, description)
    SELECT 
      $1, $2, $3, $4
    WHERE
      NOT EXISTS (
        SELECT url, id FROM urls WHERE url=$1
      )
    RETURNING 
      id;`,
    [url, title, image, description]
  );
}

async function getUrlId(url) {
  return db.query(
    `
    SELECT 
      id
    FROM
      urls
    WHERE url=$1;`,
    [url]
  );
}

async function createPost(userId, urlId, text) {
  return db.query(
    `
    INSERT INTO 
      posts("userId", "urlId", "text")
    VALUES 
      ($1, $2, $3)
    RETURNING 
      id;`,
    [userId, urlId, text]
  );
}

async function fetchData(id, page, offset) {
  return db.query(`
    SELECT 
      posts.text, 
      posts.id,
      urls.url,
      urls.title,
      urls.image,
      urls.description, 
      users.username,
      users.picture,
      users.id AS "userId"
    FROM 
      posts
    JOIN 
      urls 
    ON 
      posts."urlId" = urls.id
    JOIN 
      users 
    ON 
      posts."userId" = users.id
    LEFT JOIN 
      followers 
    ON 
      followers."followedId" = users.id
    WHERE 
      followers."followerId"=$1 OR users.id=$1
    ORDER BY 
      posts."createdAt" 
    DESC
    OFFSET
      $2 
    LIMIT 
      $3`,
    [id, page * offset, offset ]
  );
}

async function fetchUserData(id) {
  return db.query(
    `
  SELECT 
  posts.id,
  posts.text, 
  urls.url,
  urls.title,
  urls.image,
  urls.description,
  users.username,
  users.picture,
  users.id AS "userId" 
FROM posts 
  JOIN urls ON 
    posts."urlId" = urls.id
  JOIN users ON 
    posts."userId" = users.id
WHERE users.id = $1
  ORDER BY posts."createdAt" DESC LIMIT 10 
  `,
    [id]
  );
}

async function deletePost(userId, Id) {
  return db.query(
    `
  DELETE FROM posts 
  WHERE "userId" = $1 AND "id" = $2;`,
    [userId, Id]
  );
}

async function editPost(text, userId, id) {
  return db.query(
    `
  UPDATE posts 
  SET text = $1
  WHERE "userId" = $2 AND "id" = $3;`,
    [text, userId, id]
  );
}

const postRepository = {
  insertUrl,
  getUrlId,
  createPost,
  fetchData,
  fetchUserData,
  deletePost,
  editPost,
};

export default postRepository;
