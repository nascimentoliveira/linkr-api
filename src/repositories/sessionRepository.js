import connection from "../database/db.js";

async function newSession(userId) {
    return connection.query(
        `
    INSERT INTO sessions ("userId")
    VALUES ($1) RETURNING id`,
        [userId]
    );
}

export const sessionRepository = {
    newSession
}