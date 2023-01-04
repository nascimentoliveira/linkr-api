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
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
  }
}

export async function fetchTimelineData(req,res){
  try{
    const rows = await postRepository.fetchData();
    if(rows.length === 0) return res.status(204).send({message:'There are no posts yet'});
    res.status(200).send(rows)
  }catch(err){
    console.log(err);
    res.status(500).send({message: MESSAGES.FETCH_POSTS_ERROR})
  }
}
