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
  (SELECT COUNT(likes."postId") FROM likes WHERE
  posts.id = likes."postId") AS likes
FROM posts
  
  JOIN urls ON 
    posts."urlId" = urls.id
  JOIN users ON 
    posts."userId" = users.id

  ORDER BY posts."createdAt" 
  
  DESC LIMIT 20 
  `);
}



    //   SELECT 
    //   posts.text, 
    //   posts.id,
    //   urls.url,
    //   users.username,
    //   users.picture,
    //   COUNT(likes."postId") AS likes 
    // FROM posts 
    //   JOIN urls ON 
    //     posts."urlId" = urls.id
    //   JOIN users ON 
    //     posts."userId" = users.id
    //   JOIN likes ON 
    //     posts.id = likes."postId"
    //   GROUP BY posts.id
      
    //   ORDER BY posts."createdAt" 
      
    //   DESC LIMIT 20 

async function fetchUserData(id) {
  return db.query(
    `
  SELECT 
  posts.id,
  posts.text, 
  urls.url,
  users.username,
  users.picture  
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

const postRepository = {
  insertUrl,
  getUrlId,
  createPost,
  fetchData,
  fetchUserData,
};

export default postRepository;
