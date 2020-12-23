const tableName = "users";

exports.up = async function (knex) {
  if (await knex.schema.hasTable(tableName)) {
    return;
  }

  return knex.schema.createTable(tableName, function (table) {
    table.string("uid").primary().unique().notNullable().index();
    table.string("email").unique().notNullable();
    table.timestamp("created").defaultTo(knex.fn.now());
    table.timestamp("last_modified").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(table);
};
