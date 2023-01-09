import db from '../database/db.js';

async function likePost(userId, postId){
    return db.query(`
    INSERT INTO likes ("userId", "postId") 
    VALUES ($1, $2);`,
    [userId, postId]);
}

async function dislikePost(userId, postId){
    return db.query(`
    DELETE FROM likes 
    WHERE "userId" = $1 AND "postId" = $2;`,
    [userId, postId]);
}

async function countLikes(id){
    return db.query(`
    SELECT COUNT (likes."postId") 
    FROM likes 
    WHERE likes."postId" = $1;`,
    [id]);
}

async function getLikes(){
    return db.query(`
    SELECT * 
    FROM likes;`);
}

async function getLikesId(id){
    return db.query(`
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