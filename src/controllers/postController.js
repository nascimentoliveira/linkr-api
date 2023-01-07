import postRepository from '../repositories/postRepository.js';
import { handleHashtags } from './hashtagsController.js';
import { MESSAGES } from '../constants.js';
import urlMetadata from 'url-metadata';

export async function newPost(req, res) {
  const { url, text } = req.body;
  const user = res.locals.user;

  try {
    const urlRegistered =
      (await postRepository.insertUrl(url)).rows[0] ||
      (await postRepository.getUrlId(url)).rows[0];
    const [post] = (
      await postRepository.createPost(user.id, urlRegistered.id, text || '')
    ).rows;
    handleHashtags(text || '', post.id);
    res.status(201).send({ message: 'Link published successfully!' });
  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: 'There was an error publishing your link!' });
  }
}

export async function fetchMetadata(req, res) {
  const { data } = res.locals;
  try {
    const treatedData = [];
    for (let i = 0; i < data.length; i++) {
      const { url } = data[i];
      await urlMetadata(url)
        .then((metadata) => {
          const { title, description, image } = metadata;
          treatedData.push({ ...data[i], title, description, image });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
        });
    }
    res.status(200).send(treatedData);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}
