import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Linkr-API",
      version: "1.0.0",
      description: "API de Linkr, uma rede social que permite aos usuários compartilhar e descobrir links interessantes.",
    },
  },

  apis: ["src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
//
