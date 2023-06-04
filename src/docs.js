import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Linkr-API",
      version: "1.0.0",
      description: "This is the Linkr API, a social networking platform that allows users to post, " + 
      "share, and discover interesting links. With Linkr, users can create accounts, log in, and start " +
      "sharing their own links along with a description or comment. Additionally, they can explore and " +
      "discover links shared by other users, follow profiles of interest, and interact through likes and comments. " + 
      "Linkr provides an easy and intuitive way for users to share their findings and connect through " + 
      "relevant and interesting links.",
    },
  },

  apis: ["src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
//
