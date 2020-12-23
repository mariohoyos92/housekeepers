const { connectToPG } = require("../_db-connection/pg-connection.js");

const { Model } = connectToPG();

export class UserModel extends Model {
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
