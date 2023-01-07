import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { MESSAGES } from '../constants.js';
import { authRepository } from '../repositories/authRepository.js';

export async function signUpValid(req, res, next) {

  const { email } = req.body;

  try {
    const [user] = (await authRepository.getUserByEmail(email)).rows;

    if (user) {
      res.status(409).send({ message: 'E-mail already registered!' });
      return;
    }

    res.locals.user = req.body;

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
    return;
  }

  next();
}

export async function signInValid(req, res, next) {

  const { email, password } = req.body;

  try {
    const [user] = (await authRepository.getUserByEmail(email)).rows;

    if (!user) {
      res.status(404).send({ message: 'User not registered!' });
      return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).send({ message: 'Invalid password!' });
      return;
    }

    res.locals.user = user;

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
    return;
  }

  next();
}

export async function tokenValid(req, res, next) {

  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401).send({ message: 'Unexpected header format! Field "Authorization" not found.' });
    return;
  }

  try {

    let sessionId;

    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        res.status(401).send({ message: 'Invalid token, enter your account!' });
        return;
      } else {
        sessionId = result.session.id;
      }
    });

    const [user] = (await authRepository.getUserBySession(sessionId)).rows;

    if (!user) {
      res.status(404).send({ message: 'User not found!' });
      return;
    }

    res.locals.user = { id: user.id, name: user.username, email: user.email };

  } catch (err) {
    console.error(MESSAGES.INTERNAL_SERVER_ERROR, err);
    res.status(500).send({ message: MESSAGES.CLIENT_SERVER_ERROR });
    return;
  }

  next();
}