import { MESSAGES } from '../constants.js';

export default function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      res.status(422).send({ message: MESSAGES.FORMAT_ERROR, errors: errors });
      return;
    }

    next();
  }
}