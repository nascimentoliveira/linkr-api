import db from "../database/db.js";

async function insertUrl(url) {
  return db.query(
    `
    INSERT INTO 
      urls ("url")
    SELECT 
      $1
    WHERE
      NOT EXISTS (
        SELECT url, id FROM urls WHERE url=$1
      )
    RETURNING 
      id;`,
    [url]
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

async function fetchData() {
  return db.query(`
SELECT 
  posts.text, 
  posts.id,
  urls.url, 
  users.username,
  users.picture,
  users.id AS "userId"
FROM posts
  JOIN urls ON 
    posts."urlId" = urls.id
  JOIN users ON 
    posts."userId" = users.id
  ORDER BY posts."createdAt" 
    DESC LIMIT 20 
  `);
}


async function fetchUserData(id) {
  return db.query(
    `
  SELECT 
  posts.id,
  posts.text, 
  urls.url,
  users.username,
  users.picture,
  users.id AS "userId" 
FROM posts 
  JOIN urls ON 
    posts."urlId" = urls.id
  JOIN users ON 
    posts."userId" = users.id
WHERE users.id = $1
  ORDER BY posts."createdAt" DESC LIMIT 20 
  `,
    [id]
  );
}

async function deletePost(userId, urlId){
  return db.query(`
  DELETE FROM posts 
  WHERE "userId" = $1 AND "urlId" = $2;`,
  [userId, urlId]);
} 

// async function editPost(userId, urlId){
//   return db.query(`
//   DELETE FROM posts 
//   WHERE "userId" = $1 AND "urlId" = $2;`,
//   [userId, postId]);
// }

const postRepository = {
  insertUrl,
  getUrlId,
  createPost,
  fetchData,
  fetchUserData,
  deletePost,
};

export default postRepository;
