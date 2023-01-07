import db from '../database/db.js';

async function getAllHashtags() {
  return db.query(`
    SELECT 
      id, hashtag
    FROM
      hashtags;`
  );
}

async function insertHashtags(hashtags) {
  return db.query(`
    INSERT INTO 
      hashtags(hashtag)
    VALUES ` + hashtags.map((x, i) => `($${i + 1})`).join(', ') + `
    RETURNING 
      id;`,
    hashtags
  );
}

async function registerPostHashtags(postId, hashtagsIds) {
  return db.query(`
    INSERT INTO 
      "postsHashtags"("postId", "hashtagId")
    VALUES ` + hashtagsIds.map((x, i) => `($1, $${i + 2})`).join(', ') + `;`,
    [postId, ...hashtagsIds]
  );
}

async function getTopHashtags() {
  return db.query(`
    SELECT 
      h.id, h.hashtag
    FROM
      "postsHashtags" AS ph
    JOIN 
      "hashtags" AS h
    ON
      ph."hashtagId"=h.id
    GROUP BY
      ph."hashtagId", h.hashtag, h.id
    ORDER BY 
      COUNT(ph."postId")
    DESC
    LIMIT 10;`
  );
}

const hashtagRepository = {
  getAllHashtags,
  insertHashtags,
  registerPostHashtags,
  getTopHashtags
};

export default hashtagRepository;