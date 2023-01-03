import { MESSAGES } from '../constants.js';
import postRepository from '../repositories/postRepository.js';

export async function newPost(req, res) {

  const { url, text } = req.body;

  try {
    await postRepository.insertUrl(url);
    const [row] = (await postRepository.getUrlId(url)).rows;
    await postRepository.createPost(1, row.id, text || '');
    res.status(201).send({ message: 'Publicação criada com sucesso!' });

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
  }
}