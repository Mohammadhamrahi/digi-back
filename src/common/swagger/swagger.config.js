const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function SwaggerConfig(app) {
  const SwaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "digikala-backend",
        description: "digikala nodejs",
        version: "1.0.0",
      },
    },
    apis: [process.cwd() + "/src/module/**/*swagger.js"],
  });
  const swagger = swaggerUi.setup(SwaggerDocument, {});
  app.use("/swagger", swaggerUi.serve, swagger);
}

module.exports = SwaggerConfig;
