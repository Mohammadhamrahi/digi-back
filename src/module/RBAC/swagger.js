/**
 * @swagger
 * tags:
 *  - name:Rabc
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateRole:
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *     CreatePermission:
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *     PermissionToRole:
 *        properties:
 *          roleId:
 *            type: number
 *          permissions:
 *            type: array
 *            items:
 *                  type: number
 */

/**
 * @swagger
 * /rabc/create-role:
 *   post:
 *     tags:
 *       - Rabc
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRole'
 *     responses:
 *       200:
 *         description: role created
 */
/**
 * @swagger
 * /rabc/add-permission-to-role:
 *   post:
 *     tags:
 *       - Rabc
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PermissionToRole'
 *     responses:
 *       200:
 *         description: permission to role
 */

/**
 * @swagger
 * /rabc/create-permission:
 *   post:
 *     tags:
 *       - Rabc
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePermission'
 *     responses:
 *       200:
 *         description: permission created
 */
