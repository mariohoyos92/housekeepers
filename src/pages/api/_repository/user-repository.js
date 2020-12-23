const { UserModel } = require("../_models/user");

const createUser = (user) =>
  UserModel.query().insert(user).returning("*").execute();

module.exports = { createUser };
