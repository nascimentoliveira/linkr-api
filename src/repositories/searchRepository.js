import connectionDB from "../database/database.js"

async function searchUser(search){
    return connectionDB.query(`
    SELECT 
    picture,
    username,
    id
FROM 
    users 
WHERE username
    ILIKE $1
    `,[`${search}%`])
}

async function checkFollow(myId,id){
    return connectionDB.query(`
    SELECT * FROM followers WHERE "followerId" = $1 AND "followedId" = $2
    `,[myId,id])
}

const searchRepository = {
    searchUser,
    checkFollow
}

 export default searchRepository