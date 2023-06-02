import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

import usersRepository from "../repositories/users-repository.js";

async function authValid(req, res, next) {
  const { email, password } = req.body;
  try {
    const [user] = (await usersRepository.getUserByEmail(email)).rows;
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(httpStatus.UNAUTHORIZED).send({
        error: "User not registered or invalid password!",
      });
      return;
    }
    res.locals.user = user;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while validating your credentials. Please try again later.",
    });
    return;
  }
  next();
}

async function tokenValid(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    res.status(httpStatus.UNAUTHORIZED).send({
      error: "Unexpected header format! Field 'Authorization' not found.",
    });
    return;
  }
  try {
    const sessionId = jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
      if (error) {
        res.status(httpStatus.UNAUTHORIZED).send({
          error: "Invalid token, enter your account!"
        });
        return;
      } else {
        return result.session.id;
      }
    });
    const [user] = (await usersRepository.getUserBySession(sessionId)).rows;
    if (!user) {
      res.status(httpStatus.NOT_FOUND).send({
        error: "User not found, enter your account!",
      });
      return;
    }
    res.locals.user = user;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while the token was being validated. Please try again later.",
    });
    return;
  }
  next();
}

const authMiddleware = {
  authValid,
  tokenValid,
}

export default authMiddleware;
//
