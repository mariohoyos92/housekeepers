const tableName = "users";

exports.up = function (knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.string("stripe_customer_id");
    table.string("stripe_subscription_id");
    table.string("stripe_price_id");
    table.string("stripe_subscription_status");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn("stripe_customer_id");
    table.dropColumn("stripe_subscription_id");
    table.dropColumn("stripe_price_id");
    table.dropColumn("stripe_subscription_status");
  });
};
