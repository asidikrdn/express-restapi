import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { Router } from 'express';

const router = Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express REST API',
      version: '1.0.0',
      description: 'API documentation for Express REST API',
    },
    servers: [
      {
        url: '/api',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const specs = swaggerJsdoc(options);

router.use('/', swaggerUi.serve, swaggerUi.setup(specs));

export default router;
