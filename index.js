const { config } = require("dotenv");
const express = require("express");
const { notFound, errorHandller } = require("./src/errorHandling/error");
const { initDatabase } = require("./src/config/models.initial");
const SwaggerConfig = require("./src/common/swagger/swagger.config");
const { mainRouter } = require("./src/routes/app.routes");
require("./src/module/product/product.model");
require("./src/module/user/user.model");

config();

async function main() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(mainRouter);
  initDatabase();
  SwaggerConfig(app);

  notFound(app);
  errorHandller(app);

  app.listen(process.env.PORT ?? 3000, () => {
    console.log(`http://localhost:${process.env.PORT}`);
  });
}
main();
