
import {Router} from 'express'
import { createProduct, deleteProduct, getProducts, getProductById, updateAvailability, updateProduct } from './handlers/product'
import {body, param} from 'express-validator'
import { handleInputErrors } from './middleware'
const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties: 
 *                      id:
 *                          type: integer
 *                          description: The Product ID
 *                          example: 1
 *                      name:
 *                          type: string
 *                          description: The Product name
 *                          example:  Casita
 *                      price:
 *                          type: number
 *                          description: The Product Price
 *                          example:  300
 *                      availability:
 *                          type: boolean
 *                          description: The Product availability
 *                          example:  true
 * 
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              -   Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 * 
 * 
*/
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Succesful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *          400:
 *              description: Bad Request
 * 
 * 
 */



router.get('/:id', 
    
    param('id').isInt().withMessage('Id no es valido'),
    handleInputErrors,
    
    getProductById)


/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new Product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Casita"
 *                          price:
 *                              type: number
 *                              example: 300
 * 
 *      responses:
 *          201:
 *              description: Succesful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request
 * 
 * 
*/

router.post('/', 
    
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El precio del producto no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no valido'),


    handleInputErrors,
    
    createProduct 

)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          -  Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Casita"
 *                          price:
 *                              type: number
 *                              example: 300
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Succesful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *          400:
 *              description: Bad Request
 */


router.put('/:id', 

    param('id').isInt().withMessage('Id no es valido'),
    
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('El precio del producto no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no valido'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct)


/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Succesful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *          400:
 *              description: Bad Request
 *  
*/


router.patch('/:id', 
    
    param('id').isInt().withMessage('Id no es valido'),
    handleInputErrors,    
    updateAvailability)


/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by a given Id
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Succesful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          404:
 *              description: Product not found
 *          400:
 *              description: Bad Request
 *  
 * 
 * 
 * 
*/


router.delete('/:id',
    param('id').isInt().withMessage('Id no es valido'),
    handleInputErrors,
    deleteProduct
)

export default router