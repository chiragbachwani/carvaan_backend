const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Car Management System',
            version: '1.0.0',
            description: 'API documentation for Car Management System',
        },
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);
module.exports = { swaggerUi, specs };
