import db from '../database/db.js';

async function insertUrl(url) {
  return db.query(`
    INSERT INTO 
      urls ("url")
    SELECT 
      $1
    WHERE
      NOT EXISTS (
        SELECT url FROM urls WHERE url=$1
      );`, 
    [url]
  );
}

async function getUrlId(url) {
  return db.query(`
    SELECT 
      id
    FROM
      urls
    WHERE url=$1`, 
    [url]
  );
}

async function createPost(userId, urlId, text) {
  return db.query(`
    INSERT INTO 
      posts 
      ("userId", "urlId", "text")
    VALUES 
      ($1, $2, $3);`,
    [userId, urlId, text]
  );
}

async function fetchData(){
  return db.query(`
    SELECT * FROM posts ORDER BY "createdAt" DESC LIMIT 20 
  `)
}

const postRepository = {
  insertUrl,
  getUrlId,
  createPost,
  fetchData
};

export default postRepository;