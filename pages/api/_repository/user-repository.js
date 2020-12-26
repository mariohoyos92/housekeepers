const { UserModel } = require("../_models/user");

const getUserById = uid => UserModel.query().findById(uid);

const createUser = user =>
  UserModel.query()
    .insert(user)
    .returning("*")
    .execute();

const updateUser = (uid, data) => UserModel.query().patchAndFetchById(uid, data);

const getUserByStripeCustomerId = stripeCustomerId =>
  UserModel.query()
    .where({ stripeCustomerId })
    .first()
    .execute();

const updateUserByStripeCustomerId = (stripeCustomerId, data) =>
  UserModel.query()
    .update(data)
    .where({ stripeCustomerId })
    .returning("*")
    .first()
    .execute();

module.exports = {
  createUser,
  getUserById,
  getUserByStripeCustomerId,
  updateUser,
  updateUserByStripeCustomerId,
};
