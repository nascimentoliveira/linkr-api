import jwt from "jsonwebtoken";
import httpStatus from "http-status";

import usersRepository from "../repositories/users-repository.js";

const TOKEN_EXPIRE = "30d";

async function login(req, res) {
  const { id, username, picture } = res.locals.user;
  try {
    const [session] = (await usersRepository.createSession(id)).rows;
    const token = jwt.sign({ session }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRE });
    res.status(httpStatus.OK).send({
      id, username, picture, token,
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while creating a new session. Please try again later.",
    });
  }
}

const authController = {
  login,
}

export default authController;
//
