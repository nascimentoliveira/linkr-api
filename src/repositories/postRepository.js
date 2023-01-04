import db from '../database/db.js';

async function insertUrl(url) {
  return db.query(`
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
  return db.query(`
    SELECT 
      id
    FROM
      urls
    WHERE url=$1;`,
    [url]
  );
}

async function createPost(userId, urlId, text) {
  return db.query(`
    INSERT INTO 
      posts("userId", "urlId", "text")
    VALUES 
      ($1, $2, $3)
    RETURNING 
      id;`,
    [userId, urlId, text]
  );
}

const postRepository = {
  insertUrl,
  getUrlId,
  createPost
};

export default postRepository;