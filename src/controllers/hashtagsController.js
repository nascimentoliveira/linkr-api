import hashtagRepository from '../repositories/hashtagRepository.js';
import { MESSAGES } from '../constants.js';

export async function handleHashtags(str, postId) {

  const hashtags = str.match(/#\w+/g)?.map(x => x.substr(1));

  if (hashtags) {

    const registeredHashtags = (
      (await hashtagRepository.getAllHashtags()).rows
        .filter(hashtag => hashtags.includes(hashtag.hashtag)));

    const newHashtags = (
      hashtags.filter(hashtag => !registeredHashtags.map(hashtag => hashtag.hashtag).includes(hashtag)));

    let postHashtags = [];

    if (newHashtags.length > 0) {
      postHashtags = (await hashtagRepository.insertHashtags(newHashtags)).rows;
    }

    await hashtagRepository.registerPostHashtags(
      postId,
      registeredHashtags.map(hashtag => hashtag.id).concat(postHashtags.map(hashtag => hashtag.id))
    );
  }
}

export async function topHashtag(req, res) {

  try {
    const topHashtags = (await hashtagRepository.getTopHashtags()).rows;
    res.status(200).send(topHashtags);

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
  }
}

export async function hashtagPosts(req, res, next) {

  const { id } = res.locals.hashtagId;
  const page = req.query.page;
  const offset = req.query.offset;  

  try {
    const hashtagPosts = (await hashtagRepository.getHashtagPosts(id, page, offset)).rows;
    res.status(200).send(hashtagPosts);
    if (hashtagPosts.length === 0) {
      res.status(200).send({ message: "There are no posts yet" });
      return;
    }
  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
  }
}