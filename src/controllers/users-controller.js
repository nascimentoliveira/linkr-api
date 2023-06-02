import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { stripHtml } from "string-strip-html";

import usersRepository from "../repositories/users-repository.js";
import followersRepository from "../repositories/followers-repository.js";

const ROUNDS_ENCRYPT = 10;

async function createUser(req, res) {
  const { email, password, username, picture } = res.locals.user;
  try {
    await usersRepository.createUser(
      stripHtml(username).result.trim(),
      stripHtml(email).result.trim(),
      bcrypt.hashSync(password, ROUNDS_ENCRYPT),
      picture.trim(),
    );
    res.status(httpStatus.CREATED).send({
      message: "User successfully created!",
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while registering a user. Please try again later.",
    });
  }
}

async function searchUsers(req, res) {
  const username = req.query.username;
  const userId = res.locals.user.id
  try {
    const users = (await usersRepository.searchUser(username)).rows;
    const followerUsers = (await followersRepository.getFollowerUsers(userId)).rows;
    users.sort((a, b) => {
      return followers.includes(b.id) - followerUsers.includes(a.id);
    });
    res.status(httpStatus.OK).send(users)
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: "An internal server error occurred while searching for users. Please try again later.",
    });
  }
}

const usersController = {
  createUser,
  searchUsers,
}

export default usersController;
//
