/**
 * @swagger
 *  tags:
 *    - name: Order
 */

/**
 * @swagger
 * /order/get:
 *   get:
 *     summary: get Order
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: order user
 */
/**
 * @swagger
 * /order/get/{id}:
 *   get:
 *     summary: get order
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *     responses:
 *       200:
 *         description: create order
 */
