import joi from "joi";

const searchSchema = joi.object({
  search: joi.string().required().min(3),
});

export default searchSchema;
//
