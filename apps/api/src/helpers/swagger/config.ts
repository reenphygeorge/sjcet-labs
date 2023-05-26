/* eslint-disable import/no-extraneous-dependencies */
import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Lab Management System',
      version: '1.0.0',
      description: ' Bookings, Reports, Seat allocations and much more!! ',
    },
  },
  apis: ['**/*.ts'],
};

export default swaggerOptions;
