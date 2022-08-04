const { Client, Pool } = require("pg");

var connectionString =
  "postgres://postgres:postgres@18.222.165.150:5432/sdc_curium";
// const client = new Client(connectionString);
// const credentials = {
//   user: "postgres",
//   database: "sdc_curium",
//   password: "postgres",
// };
const credentials = {
  host: "18.222.165.150",
  user: "postgres",
  database: "sdc_curium",
  password: "postgres_sdc",
};
const client = new Client(credentials);
const pool = new Pool(credentials);
// module.exports = client;
module.exports = pool;
