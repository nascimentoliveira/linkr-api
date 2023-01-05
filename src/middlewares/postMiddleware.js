import postRepository from "../repositories/postRepository.js";

export async function fetchData(req, res, next) {
  try {
    const { rows } = await postRepository.fetchData();
    if (rows.length === 0)
      return res.status(204).send({ message: "There are no posts yet" });
    res.locals.data = rows;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: MESSAGES.FETCH_POSTS_ERROR });
  }
}
