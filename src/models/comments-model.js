import joi from "joi";

const commentSchema = joi.object({
  userId: joi.number().positive(),
  comment: joi.string().required(),
});

export default commentSchema;
//
