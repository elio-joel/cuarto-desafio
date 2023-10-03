import swaggerUIExpress from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import { MBeautyRequestLogger } from '../utils/logger';

export default function configureSwagger(app) {

    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'MarceBeautyAPI',
                version: '1.0.0',
                description: 'MarceBeauty API - La autorización a través de la cookie JWT no es compatible con Swagger. [Mas informacion](https://swagger.io/docs/specification/authentication/cookie-authentication/)Alternativa,  se pude obtener la cookie jwt credentials usando el login page:\[Login page](http://localhost:${process.env.PORT}/login)`,'
               },
            servers: [
                {
                    description: `${process.env.NODE_ENV} server`,
                    url: `http://localhost:${process.env.PORT}`,
                },
            ],
        },
        apis: ['./src/**/*.yaml'],
    };

    const specs = swaggerJsDoc(swaggerOptions);
    app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs) );

}