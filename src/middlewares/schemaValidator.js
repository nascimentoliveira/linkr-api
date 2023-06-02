import httpStatus from "http-status";

function schemaValidador(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
        error: "Body is not the expected format!",
        errors: errors,
      });
      return;
    }
    next();
  };
}

export default schemaValidador;
//
