import hashtagRepository from '../repositories/hashtagRepository.js';

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