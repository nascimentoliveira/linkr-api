import httpStatus from "http-status";

import followersRepository from "../repositories/followers-repository.js";

async function checkFollow(req, res, next) {
  const userId = res.locals.user.id;
  const userParamId = res.locals.userParam.id;
  try {
    const [follows] = (await followersRepository.checkFollows(userParamId, userId)).rows;
    if (req.method === "POST" && follows) {
      res.status(httpStatus.OK).send({
        message: "Already followed!",
      });
      return;
    } else if ((req.method === "DELETE" && !follows)) {
      res.status(httpStatus.OK).send({
        message: "Already unfollowed!",
      });
      return;
    }
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while checking if the user has already been followed. Please try again later.",
    });
    return;
  }
  next();
}

async function checkIsYourself(_, res, next) {
  const userId = res.locals.userParam.id;
  const id = res.locals.user.id;
  if (userId === id) {
    res.status(httpStatus.FORBIDDEN).send({
      error: "Operation not allowed. You can't follow yourself!",
    });
    return;
  }
  next();
}

const followersMiddleware = {
  checkFollow,
  checkIsYourself,
}

export default followersMiddleware;
//
