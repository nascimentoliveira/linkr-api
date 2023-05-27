import connectionDB from "../database/database.js"

async function follow(followedId, followerId) {
  return connectionDB.query(`
    INSERT INTO 
      followers ("followedId", "followerId")
    VALUES 
      ($1, $2);`,
    [followedId, followerId],
  );
}

async function unfollow(followedId, followerId) {
  return connectionDB.query(`
    DELETE FROM
      followers
    WHERE 
      "followedId"=$1 AND "followerId"=$2;`,
    [followedId, followerId],
  );
}

async function checkFollow(followedId, followerId) {
  return connectionDB.query(`
    SELECT 
      users.username, 
      users.picture 
    FROM 
      users 
    JOIN 
      followers 
    ON 
      users.id=followers."followedId" 
    WHERE 
      "followedId"=$1 AND "followerId"=$2;`,
    [followedId, followerId],
  );
}

async function getUserData(userId) {// verificar
  return connectionDB.query(`
    SELECT 
      username, picture
    FROM 
      users
    WHERE 
      id=$1;`,
    [userId],
  );
}

async function checkMyFollwed(userId) {
  return connectionDB.query(`
    SELECT 
      followers.id 
    FROM 
      followers 
    JOIN 
      users 
    ON 
      users.id=followers."followerId" 
    WHERE 
      users.id=$1;`,
    [userId],
  );
}
async function getFollowersId(userId) {
  return connectionDB.query(`
    SELECT 
      ARRAY(
        SELECT 
          "followedId"
        FROM 
          followers
        WHERE followers."userId"=$1
      );`,
    [userId],
  );
};

const followersRepository = {
  follow,
  unfollow,
  checkFollow,
  getUserData,
  getFollowersId,
  checkMyFollwed,
};

export default followersRepository;
//
