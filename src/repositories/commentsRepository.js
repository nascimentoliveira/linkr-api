import connectionDB from "../database/database.js"

async function createComment(postId, userId, comment) {
    return connectionDB.query(
        `
            INSERT 
            INTO comments
            ("postId", "userId", comment)
            VALUES ($1, $2, $3)
        `,
        [postId, userId, comment]
    );
};

async function getComments(postId) {
    return connectionDB.query(
        `
            SELECT 
                comments."userId" as "userIdComment", 
                posts."userId" as "userIdPost", 
                users.username, 
                users.picture, 
                comments.comment
            FROM comments
            JOIN users
            ON comments."userId" = users.id
            LEFT JOIN posts
            ON comments."postId" = posts.id
            WHERE comments."postId" = $1
        `,
        [postId]
    );
};

export const commentRepository = {
    createComment,
    getComments
};