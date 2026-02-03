const { config } = require("dotenv");
const { Sequelize } = require("sequelize");
config();

const sequelize = new Sequelize({
  dialect: "mariadb",
  database: "digikala",
  username: "root",
  password: "Aa@123456",
  port: "3307",
  host: "localhost",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connectd");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  sequelize,
};
