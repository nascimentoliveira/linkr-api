import { MESSAGES } from "../constants.js";
import searchRepository from "../repositories/searchRepository.js";

export async function searchUsers(req, res, next) {
  const { search } = req.body;
  const { id } = res.locals.user;
  try {
    const { rows } = await searchRepository.searchUser(search);
    res.locals.data = rows;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: MESSAGES.FETCH_USERS_ERROR });
  }
}

export async function checkSearchFollows(req, res) {
  const { data } = res.locals;
  const myId = res.locals.user.id;
  try {
    const treatedData = [];
    for (let i = 0; i < data.length; i++) {
      const { rows } = await searchRepository.checkFollow(myId, data[i].id);
      if (rows.length > 0) {
        treatedData.push({ ...data[i], follows: true });
      } else {
        treatedData.push({ ...data[i], follows: false });
      }
    }
    treatedData.sort((a, b) => {
      return b.follows - a.follows;
    });
    res.status(200).send(treatedData);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: MESSAGES.FETCH_USERS_ERROR });
  }
}
