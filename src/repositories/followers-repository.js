import connectionDB from "../database/database.js"

async function follow(followedId, followerId) {
  return connectionDB.query(`
    INSERT INTO followers ("followedId", "followerId")
    VALUES ($1, $2);`,
    [followedId, followerId],
  );
}

async function unfollow(followedId, followerId) {
  return connectionDB.query(`
    DELETE FROM followers
    WHERE "followedId"=$1 AND "followerId"=$2;`,
    [followedId, followerId],
  );
}

async function checkFollow(followedId, followerId) {
  return connectionDB.query(`
    SELECT users.username, users.picture 
    FROM users 
    JOIN followers 
      ON users.id=followers."followedId" 
    WHERE "followedId"=$1 AND "followerId"=$2;`,
    [followedId, followerId],
  );
}

async function getFollowedUsers(followerId) {
  return connectionDB.query(`
    SELECT followers.id 
    FROM followers 
    WHERE followers."followerId"=$1;`,
    [followerId],
  );
}

const followersRepository = {
  follow,
  unfollow,
  checkFollow,
  getFollowedUsers,
};

export default followersRepository;
//
