import searchUser from "../repositories/searchRepository.js";
import { MESSAGES } from "../constants.js";

export default async function searchUsers(req,res){
    const {search} = req.body;
    try{
        const {rows} = await searchUser(search)
        res.status(200).send(rows)
    } catch(err){
        console.error(err)
        res.status(500).send({message: MESSAGES.FETCH_USERS_ERROR})
    }
}
