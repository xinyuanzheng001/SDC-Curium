const { Client } = require("pg");

var connectionString = "postgres://postgres:postgres@localhost:5432/sdc_curium";
const credentials = {
  user: "postgres",
  database: "sdc_curium",
  password: "postgres",
};
const client = new Client(credentials);
// const client = new Client(connectionString);
module.exports = client;
