import db from '../database/db.js';

async function likePost(userId, postId){
    return db.query(`
    INSERT INTO likes ("userId", "postId") 
    VALUES ($1, $2)`,
        [userId, postId]);
}

async function dislikePost(userId, postId){
    return db.query(`
    DELETE FROM like 
    WHERE "userId" = $1 AND "postId" = $2`,
    [userId, postId]);
}

async function countLikes(id){
    return db.query(`
    SELECT COUNT (likes."postId") 
    FROM like 
    WHERE likes."postId" = $1`,
    [id]);
}

const likesRepository = {
    likePost,
    dislikePost,
    countLikes
}
export default likesRepository;