const Sequelize = require("sequelize");
const sequelize = new Sequelize("uptasknode", "root", "mysql", {
  host: "localhost",
  dialect: "mysql",
  operatorAliases: false,
  define: {
    timestamps: false,
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
