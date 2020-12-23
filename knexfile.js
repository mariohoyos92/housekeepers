require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      connectionString: process.env.PG_CONNECTION_STRING,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "postgresql",
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
