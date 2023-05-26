import connectionDB from "../database/database.js"

async function likePost(userId, postId){
    return connectionDB.query(`
    INSERT INTO likes ("userId", "postId") 
    VALUES ($1, $2);`,
    [userId, postId]);
}

async function dislikePost(userId, postId){
    return connectionDB.query(`
    DELETE FROM likes 
    WHERE "userId" = $1 AND "postId" = $2;`,
    [userId, postId]);
}

async function countLikes(id){
    return connectionDB.query(`
    SELECT COUNT (likes."postId") 
    FROM likes 
    WHERE likes."postId" = $1;`,
    [id]);
}

async function getLikes(){
    return connectionDB.query(`
    SELECT * 
    FROM likes;`);
}

async function getLikesId(id){
    return connectionDB.query(`
    SELECT likes.id, likes."postId", users.username, likes."userId"
    FROM likes
    JOIN users ON users.id = likes."userId"
    WHERE likes."postId" = $1`, 
    [id]);
}

const likesRepository = {
    likePost,
    dislikePost,
    countLikes,
    getLikes,
    getLikesId,
}

export default likesRepository;