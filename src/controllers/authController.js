import { stripHtml } from 'string-strip-html';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { authRepository } from '../repositories/authRepository.js';
import { MESSAGES, ROUNDS_ENCRYPT, TOKEN_EXPIRE } from '../constants.js';

dotenv.config();

export async function signUp(req, res) {

  const { username, email, password, picture } = res.locals.user;
  const passwordHash = bcrypt.hashSync(password, ROUNDS_ENCRYPT);
  const cleansedName = stripHtml(username).result;
  const cleansedEmail = stripHtml(email).result;

  try {
    await authRepository.newUser(
      cleansedName.trim(),
      cleansedEmail.trim(),
      passwordHash,
      picture.trim()
    );
    res.status(201).send({ message: 'User successfully created!' });

  } catch (error) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, error);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
  }
}

export async function signIn(req, res) {

  const { id, email, username, picture } = res.locals.user;

  try {

    const [session] = (await authRepository.newSession(id)).rows;
    const token = jwt.sign(
      { session },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRE }
    );

    res.status(200).send({
      token: token,
      username: username,
      picture: picture
    });

  } catch (error) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, error);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
  }
}