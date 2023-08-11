const { bearerAuth } = require("./swagger/components/securityScheme");
const rolePath = require("./swagger/paths/role");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express REST API Boilerplate",
    description: "Documentation for express REST API boilerplate by asidikrdn",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000/api/v1",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: bearerAuth,
    },
  },
  paths: { ...rolePath },
};

module.exports = swaggerDefinition;
