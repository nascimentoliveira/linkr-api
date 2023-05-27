import connectionDB from "../database/database.js"

async function insertUrl(url, title, image, description) {
  return connectionDB.query(`
    INSERT INTO 
      urls (url, title, image, description)
    SELECT 
      $1, $2, $3, $4
    WHERE
      NOT EXISTS (
        SELECT 
          url, id 
        FROM 
          urls 
        WHERE url=$1
      )
    RETURNING 
      id;`,
    [url, title, image, description],
  );
}

async function getUrlId(url) {
  return connectionDB.query(`
    SELECT 
      id
    FROM
      urls
    WHERE url=$1;`,
    [url],
  );
}

async function createPost(userId, urlId, text) {
  return connectionDB.query(`
    INSERT INTO 
      posts("userId", "urlId", "text")
    VALUES 
      ($1, $2, $3)
    RETURNING 
      id;`,
    [userId, urlId, text],
  );
}

async function fetchData(id, offset, more) {
  return connectionDB.query(`
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
      (followers."followerId"=$1 OR users.id=$1) 

    ORDER BY 
      posts."createdAt" 
    DESC
    OFFSET
      $2 
    LIMIT 
      $3;`,
    [id, offset, more],
  );
}

async function getNewPosts(id, lastRefresh) {
  return connectionDB.query(`
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
      (followers."followerId"=$1 OR users.id=$1) 
    AND 
      (posts."createdAt">$2)
    ORDER BY 
      posts."createdAt" 
    DESC;`,
    [id, lastRefresh],
  );
}


async function getUserData(id, page, offset) {
  return connectionDB.query(`
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
    WHERE 
      users.id=$1
    ORDER BY 
      posts."createdAt" 
    DESC     
    OFFSET
      $2 
    LIMIT 
      $3;`,
    [id, page * offset, offset],
  );
}

async function getPostById(postId) {
  return connectionDB.query(`
    SELECT 
      *
    FROM 
      posts
    WHERE 
      id=$1;`,
    [postId]
  );
}

async function deletePost(postId) {
  return connectionDB.query(`
    DELETE FROM 
      posts 
    WHERE 
      id=$1;`,
    [postId],
  );
}

async function editPost(newText, postId) {
  return connectionDB.query(`
    UPDATE 
      posts 
    SET 
      text=$1
    WHERE 
      id=$3;`,
    [newText, postId],
  );
}

const postsRepository = {
  insertUrl,
  getUrlId,
  createPost,
  fetchData,
  getUserData,
  getPostById,
  deletePost,
  editPost,
  getNewPosts,
};

export default postsRepository;
