/**
 * @swagger
 * tags:
 *  - name:Basket
 *    description:Basket Swagger
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AddToBasket:
 *        required:
 *           - productId
 *        properties:
 *          productId:
 *            type: number
 *          colorId:
 *            type: number
 *          discount:
 *            type: string
 *          sizeId:
 *            type: number
 */

/**
 * @swagger
 * /basket/add-to-basket:
 *   post:
 *     tags:
 *       - Basket
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddToBasket'
 *     responses:
 *       200:
 *         description: Add to basket
 */

/**
 * @swagger
 * /basket/remove-to-basket:
 *   post:
 *     tags:
 *       - Basket
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddToBasket'
 *     responses:
 *       200:
 *         description: remove to basket
 */
