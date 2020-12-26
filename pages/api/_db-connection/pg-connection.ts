import knex, { Config } from "knex";
import knexConfigurations from "../../../knexfile";
import { Model, knexSnakeCaseMappers } from "objection";

const knexConfig: Config = {
  ...knexConfigurations[process.env.NODE_ENV],
  ...knexSnakeCaseMappers(),
};

let cachedDb: null | { Model: typeof Model; instance: knex } = null;

export const connectToPG = () => {
  if (cachedDb) {
    return cachedDb;
  }
  const instance = knex(knexConfig)
    .on("connect", () => console.log("connected to postgres db"))
    .on("error", err => {
      console.log("Database Error");
      console.log(err);
      throw Error(err);
    });

  Model.knex(instance);
  cachedDb = { Model, instance };
  return cachedDb;
};
