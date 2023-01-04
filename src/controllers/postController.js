import postRepository from '../repositories/postRepository.js';
import { handleHashtags } from './hashtagsController.js';
import { MESSAGES } from '../constants.js';

export async function newPost(req, res) {

  const { url, text } = req.body;

  try {

    const urlRegistered = (await postRepository.insertUrl(url)).rows[0] || (await postRepository.getUrlId(url)).rows[0];
    const [post] = (await postRepository.createPost(1, urlRegistered.id, text || '')).rows;
    handleHashtags(text || '', post.id);
    res.status(201).send({ message: 'Link publicado com sucesso!' });

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: 'Houve um erro ao publicar seu link!' });
  }
}

