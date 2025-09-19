import { SwaggerUiOptions } from './../../node_modules/@types/swagger-ui-express/index.d';
import swaggerJSDoc from "swagger-jsdoc";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'Rest API Node.js / Express  / TypeScript',
            version: "1.0.0",
            description: "API docs for Products"
        }
    },
    apis:['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const SwaggerUiOptions : SwaggerUiOptions = {
    /**
     * customCss: `
     *      .topbar-wrapper .link {
     *      content: url('link imagen de logo')
     *      height: 120px;
     *      width: auto;
     *  }
     * 
     * 
     * 
     * `
     * 
     * 
     * */
    customSiteTitle: 'Documentación Rest API Express / TypeScript' 
}

export default swaggerSpec

export {
    SwaggerUiOptions
}