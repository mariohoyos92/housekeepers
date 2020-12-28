require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DATABASE,
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
