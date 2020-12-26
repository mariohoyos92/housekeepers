import { UserModel } from "../_models/user";

export const getUserById = (uid: string) => UserModel.query().findById(uid);

export const createUser = (user: Partial<UserModel>) =>
  UserModel.query()
    .insert(user)
    .returning("*")
    .execute();

export const updateUser = (uid: string, data: Partial<UserModel>) => UserModel.query().patchAndFetchById(uid, data);

export const getUserByStripeCustomerId = (stripeCustomerId: string) =>
  UserModel.query()
    .where({ stripeCustomerId })
    .first()
    .execute();

export const updateUserByStripeCustomerId = (stripeCustomerId: string, data: Partial<UserModel>) =>
  UserModel.query()
    .update(data)
    .where({ stripeCustomerId })
    .returning("*")
    .first()
    .execute();
