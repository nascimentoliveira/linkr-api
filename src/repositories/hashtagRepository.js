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

const hashtagRepository = {
  getAllHashtags,
  insertHashtags,
  registerPostHashtags
};

export default hashtagRepository;