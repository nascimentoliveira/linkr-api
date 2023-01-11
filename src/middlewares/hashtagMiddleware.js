import { MESSAGES } from '../constants.js';
import hashtagRepository from '../repositories/hashtagRepository.js';

export async function hashtagValid(req, res, next) {

  const { hashtag } = req.params;

  try {
    const [hashtagId] = (await hashtagRepository.hashtagRegistered(hashtag)).rows;

    if (!hashtagId) {
      res.status(404).send({ message: 'hashtag not registered!' });
      return;
    }

    res.locals.hashtagId = hashtagId;

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
    return;
  }

  next();
}