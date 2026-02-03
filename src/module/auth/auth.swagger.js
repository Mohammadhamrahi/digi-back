/**
 * @swagger
 * tags:
 *  - name: otpCode
 *    description: send otp code in user
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SendOtpCode:
 *       type: object
 *       required:
 *          - mobile
 *       properties:
 *         mobile:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RefreshToken:
 *       type: object
 *       required:
 *          - refresh_token
 *       properties:
 *         refresh_token:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CheckOtpCode:
 *       type: object
 *       required:
 *          - mobile
 *          - code
 *       properties:
 *         mobile:
 *           type: string
 *         code:
 *           type: string
 */

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Send otp code
 *     tags:
 *       - otpCode
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/SendOtpCode'
 *     responses:
 *       200:
 *         description: create product
 */

/**
 * @swagger
 * /auth/check-otp:
 *   post:
 *     summary: check otp code
 *     tags:
 *       - otpCode
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/CheckOtpCode'
 *     responses:
 *       200:
 *         description: create product
 */

/**
 * @swagger
 * /auth/refresh_token:
 *   post:
 *     summary: Refresh token set
 *     tags:
 *       - otpCode
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       200:
 *         description: refresh token
 */
