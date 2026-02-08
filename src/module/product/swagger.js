/**
 * @swagger
 * tags:
 *  - name:Product
 *    description:Product Swagger
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProduct:
 *        type: object
 *        required:
 *           - title
 *           - type
 *        properties:
 *          title:
 *            type: string
 *          price:
 *            type: string
 *          discount:
 *            type: string
 *          active_discount:
 *            type: boolean
 *          count:
 *            type: number
 *          description:
 *            type: string
 *          type:
 *            type: string
 *            enum:
 *                  - single
 *                  - sizing
 *                  - colors
 *          detail:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                key:
 *                  type: string
 *                value:
 *                  type: string
 *          colors:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                colorName:
 *                  type: string
 *                colorCode:
 *                  type: string
 *                productId:
 *                  type: number
 *                count:
 *                  type: number
 *                discount:
 *                  type: string
 *                activeDiscount:
 *                  type: boolean
 *                price:
 *                  type: string
 *          sizes:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                size:
 *                  type: string
 *                productId:
 *                  type: number
 *                count:
 *                  type: number
 *                discount:
 *                  type: string
 *                activeDiscount:
 *                  type: boolean
 *                price:
 *                  type: string
 */

/**
 * @swagger
 * /product/create-product:
 *   post:
 *     summary: Create Product
 *     tags:
 *       - Product
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       200:
 *         description: create product
 */

/**
 * @swagger
 * /product/get-all:
 *   get:
 *     summary: get Product
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: create product
 */

/**
 * @swagger
 * /product/get-by-id/{id}:
 *   get:
 *     summary: get Product
 *     tags:
 *       - Product
 *     parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *     responses:
 *       200:
 *         description: create product
 */

/**
 * @swagger
 * /product/delete/{id}:
 *   delete:
 *     summary: get Product
 *     tags:
 *       - Product
 *     parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *     responses:
 *       200:
 *         description: create product
 */
