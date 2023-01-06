import postRepository from "../repositories/postRepository.js";
import { handleHashtags } from "./hashtagsController.js";
import { MESSAGES } from "../constants.js";
import urlMetadata from "url-metadata";

export async function newPost(req, res) {
  const { url, text } = req.body;

  try {
    const urlRegistered =
      (await postRepository.insertUrl(url)).rows[0] ||
      (await postRepository.getUrlId(url)).rows[0];
    const [post] = (
      await postRepository.createPost(1, urlRegistered.id, text || "")
    ).rows;
    handleHashtags(text || "", post.id);
    res.status(201).send({ message: "Link publicado com sucesso!" });
  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
  }
}

export async function fetchMetadata(req, res) {
  const { data } = res.locals;
  try {
    const promises = [];
    data.map((d) => promises.push(urlMetadata(d.url)));
    const metadatas = await Promise.all(promises);
    const treatedData = data.map((d, i) => {
      const { title, image, description } = metadatas[i];
      return { ...d, title, image, description };
    });
    res.status(200).send(treatedData);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}
