import { connectToPG } from "../_db-connection/pg-connection";

const { Model } = connectToPG();

export class UserModel extends Model {
  uid!: string;
  email!: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeSubscriptionStatus?: string;
  created!: string;
  lastModified!: string;

  static get idColumn() {
    return "uid";
  }

  static get tableName() {
    return "users";
  }

  $beforeInsert() {
    this.created = new Date().toISOString();
    this.lastModified = new Date().toISOString();
  }

  $beforeUpdate() {
    this.lastModified = new Date().toISOString();
  }
}
