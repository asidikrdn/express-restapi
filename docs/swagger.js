const { bearerAuth } = require("./swagger/component/securityScheme");
const rolePath = require("./swagger/path/role");
const userPath = require("./swagger/path/user");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express REST API Boilerplate",
    description: "Documentation for express REST API boilerplate by asidikrdn",
    version: "1.0.0",
    license: {
      name: "MIT",
      url: "https://github.com/asidikrdn/express-restapi-boilerplate/LICENSE",
    },
    contact: {
      name: "Ahmad Sidik Rudini",
      url: "https://asidikrdn.my.id",
      email: "sidikrudini16@gmail.com",
    },
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
  paths: { ...rolePath, ...userPath },
};

module.exports = swaggerDefinition;
