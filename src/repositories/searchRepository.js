import db from "../database/db.js";

export default async function searchUser(search){
    return db.query(`
        SELECT 
            picture,
            username,
            id
        FROM 
            users
        WHERE unaccent(username)
            ILIKE $1
        ORDER BY username
    `,[`${search}%`])
}
