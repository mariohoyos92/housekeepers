import knex from "knex";
import knexConfigurations from "../../../../knexfile";
import { Model, knexSnakeCaseMappers } from "objection";

const knexConfig = {
  ...knexConfigurations[process.env.NODE_ENV],
  ...knexSnakeCaseMappers(),
};

let cachedDb = null;

const connectToPG = () => {
  if (cachedDb) {
    return cachedDb;
  }
  const instance = knex(knexConfig)
    .on("connect", () => console.log("connected to postgres db"))
    .on("error", (err) => {
      throw Error(err);
    });

  Model.knex(instance);
  cachedDb = { Model, instance };
  return cachedDb;
};

module.exports = { connectToPG };
