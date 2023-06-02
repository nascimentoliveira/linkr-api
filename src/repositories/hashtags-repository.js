import connectionDB from "../database/database.js";

async function insertHashtags(hashtags) {
  return connectionDB.query(`
    WITH "newhashtags" AS (
      SELECT unnest($1::text[]) AS hashtag
    ),
    "existingIds" AS (
      SELECT id
      FROM hashtags
      WHERE hashtag IN (SELECT hashtag FROM "newhashtags")
    ),
    "newIds" AS (
      INSERT INTO hashtags(hashtag)
      SELECT hashtag
      FROM "newhashtags"
      WHERE NOT EXISTS (
        SELECT 1
        FROM hashtags
        WHERE hashtag="newhashtags".hashtag
      )
      RETURNING id
    )
    SELECT array_agg(id) AS ids
    FROM (
      SELECT id FROM "existingIds"
      UNION ALL
      SELECT id FROM "newIds"
    ) AS combined;`,
    [hashtags],
  );
}

async function registerPostHashtags(postId, hashtagsIds) {
  return connectionDB.query(`
    WITH "hashtagsIds" AS (
      SELECT $1::int AS "postId", unnest($2::int[]) AS "hashtagId"
    )
    INSERT INTO "postsHashtags" ("postId", "hashtagId")
    SELECT "hashtagsIds"."postId", "hashtagsIds"."hashtagId"
    FROM "hashtagsIds"
    LEFT JOIN "postsHashtags" 
      ON "postsHashtags"."postId"="hashtagsIds"."postId" 
      AND "postsHashtags"."hashtagId"="hashtagsIds"."hashtagId"
    WHERE "postsHashtags"."postId" IS NULL;`,
    [postId, hashtagsIds],
  );
}

async function getHashtagsTrending() {
  return connectionDB.query(`
    SELECT hashtags.id, hashtags.hashtag
    FROM "postsHashtags"
    JOIN hashtags
      ON "postsHashtags"."hashtagId"=hashtags.id
    GROUP BY 
      "postsHashtags"."hashtagId", 
      hashtags.hashtag, 
      hashtags.id
    ORDER BY COUNT("postsHashtags"."postId") DESC
    LIMIT 10;`,
  );
}

async function getHashtagPosts(userId, hashtagId, offset, more) {
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
    JOIN "postsHashtags" 
      ON "postsHashtags"."postId"=posts.id
    WHERE "postsHashtags"."hashtagId"=$2
    ORDER BY posts."createdAt" DESC 
    OFFSET $3
    LIMIT $4;`,
    [userId, hashtagId, offset, more],
  );
}

async function getHashtagId(hashtag) {
  return connectionDB.query(`
    SELECT id
    FROM hashtags
    WHERE hashtag=$1;`,
    [hashtag],
  );
}

const hashtagsRepository = {
  insertHashtags,
  registerPostHashtags,
  getHashtagsTrending,
  getHashtagPosts,
  getHashtagId,
};

export default hashtagsRepository;
//
