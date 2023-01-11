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
        SELECT id FROM followers WHERE "followedId" = $1 AND "followerId" = $2
    `,
    [followed, follower]
  );
}
const followRepository = {
  follow,
  unfollow,
  checkFollow,
};

export default followRepository;
