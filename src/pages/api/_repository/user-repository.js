const { UserModel } = require("../_models/user");

const getUserById = (uid) => UserModel.query().where({ uid }).first().execute();

const createUser = (user) =>
  UserModel.query().insert(user).returning("*").execute();

module.exports = { createUser, getUserById };
