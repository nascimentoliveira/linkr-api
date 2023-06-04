import httpStatus from "http-status";

import usersRepository from "../repositories/users-repository.js";

async function emailIsValid(req, res, next) {
  const { email } = req.body;
  try {
    const [user] = (await usersRepository.getUserByEmail(email)).rows;
    if (user) {
      res.status(httpStatus.CONFLICT).send({
        error: "E-mail already registered!",
      });
      return;
    }
    res.locals.user = req.body;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while registering a user. Please try again later.",
    });
    return;
  }
  next();
}

async function userIdParamValid(req, res, next) {
  const { userId } = req.params;
  try {
    if (!userId) {
      res.status(httpStatus.BAD_REQUEST).send({
        error: "The 'userId' parameter is mandatory and must be provided.",
      });
      return;
    }
    const [userParam] = (await usersRepository.getUserById(userId)).rows;
    if (!userParam) {
      res.status(httpStatus.NOT_FOUND).send({
        error: "The user specified in the parameter was not found!",
      });
      return;
    }
    res.locals.userParam = userParam;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while validating the parameter. Please try again later.",
    });
    return;
  }
  next();
}

const usersMiddleware = {
  emailIsValid,
  userIdParamValid,
}

export default usersMiddleware;
//
