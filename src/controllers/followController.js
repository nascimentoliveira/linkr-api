import followRepository from "../repositories/followRepository.js";

export async function follow(req, res) {
  const followerId = res.locals.user.id;
  const followedId = req.params.id;
  try {
    await followRepository.follow(followedId, followerId);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message:
        "An error occurred while trying to follow. Please reload the page.",
    });
  }
}

export async function unfollow(req, res) {
  const followerId = res.locals.user.id;
  const followedId = req.params.id;
  try {
    await followRepository.unfollow(followedId, followerId);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message:
        "An error occurred while trying to unfollow. Please reload the page.",
    });
  }
}
