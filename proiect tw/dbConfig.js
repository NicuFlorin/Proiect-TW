const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "mssql",
  database: "Proiect",
  username: "sa",
  host: "localhost",
  port: "55892",
  password: "12345",
  validateBulkLoadParameters: true,
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});
module.exports.db = db;
