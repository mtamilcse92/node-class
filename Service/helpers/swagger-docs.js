/* global appConstants config b:true */
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        info: {
            title: 'Node Express Service',
            description: 'Node Express Service',
            contact: {
                name: appConstants.companyName,
                url: appConstants.companyUrl
            }
        },
        tags: [
            {
                name: 'node-express-service',
                description: 'Manage and authorize form submissions'
            }
        ]
    },
    basePath: '/api',
    consumes: [
        'application/json'
    ],
    produces: [
        'application/json'
    ],
    // Path to the API docs
    apis: ['./api/controllers/*.js']
};

const getSwaggerSpecs = () => {
    const spec = swaggerJSDoc(options);
    const definitions = spec.paths.definitions;
    delete spec.paths.definitions;
    spec.definitions = definitions;
    return spec;
}

// Swagger
const swaggerSpec = getSwaggerSpecs();

const swaggerResources = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(appConstants.formSwaggerResources);
};

const apiDocs = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
};

export const swaggerRoutes = (app) => {
    // Insert routes below
    app.use('/swagger-ui.html', swaggerUi.serve, swaggerUi.setup(swaggerSpec, false, { validatorUrl: null }));
    app.use('/swagger-resources', swaggerResources);
    app.use('/api-docs', apiDocs);
}
