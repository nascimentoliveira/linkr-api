import db from "../database/db.js";

async function follow(followed, follower) {
  return db.query(
    `
        INSERT INTO 
            followers ("followedId", "followerId")
        VALUES ($1, $2)
    `,
    [followed, follower]
  );
}

async function unfollow(followed, follower) {
  return db.query(
    `
          DELETE FROM
              followers
          WHERE "followedId"=$1 AND "followerId" = $2
      `,
    [followed, follower]
  );
}

async function checkFollow(followed, follower) {
  return db.query(
    `
        SELECT 
          users.username, 
          users.picture 
        FROM users 
          JOIN followers 
          ON users.id = followers."followedId" 
        WHERE "followedId" = $1 AND "followerId" = $2
    `,
    [followed, follower]
  );
}

async function getUserData(id) {
  return db.query(
    `
    SELECT 
      username, 
      picture
    FROM users
      WHERE id = $1;
  `,
    [id]
  );
}

async function checkMyFollwed(id) {
  return db.query(
    `
    SELECT 
      f.id 
    FROM 
      followers f 
    JOIN users 
      ON users.id = f."followerId" 
    WHERE users.id = $1
  `,
    [id]
  );
}
async function getFollowersId(userId){
  return connection.query(
      `
          SELECT ARRAY(
              SELECT "followedUserId"
              FROM "followedUsers" f
              WHERE f."userId" = $1
          )
      `,
      [userId]
  );
};

// async function hasPosts(id) {
//   return db.query(
//     `
//     SELECT
//       *
//     FROM
//       posts
//     JOIN
//       followers ON posts."userId" = followers."followedId"
//     WHERE
//       followers."followerId" = $1
//   `,
//     [id]
//   );
// }
const followRepository = {
  follow,
  unfollow,
  checkFollow,
  getUserData,
  getFollowersId.
  checkMyFollwed
};

export default followRepository;
