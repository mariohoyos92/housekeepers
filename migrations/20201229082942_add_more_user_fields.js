const tableName = "users";

exports.up = function(knex) {
  return knex.schema.alterTable(tableName, table => {
    table.boolean("is_housekeeper_seeker").default(false);

    // Shared fields
    table.string("first_name");
    table.string("email_verified");
    table.string("last_name");
    table.string("slug").index();
    table.string("text_code").index();
    table.string("picture");
    table.string("headline");
    table.string("phone_number");

    // Fields for housekeeper
    table.boolean("is_housekeeper").default(false);
    table.text("description");
    table.float("hourly_rate");
    table.float("years_of_experience");
    table.boolean("has_own_transportation").default(false);
    table.boolean("has_own_equipment").default(false);
    table.boolean("has_own_supplies").default(false);
    table.boolean("requires_sponsorship").default(false);
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable(tableName, table => {
    table.dropColumn("is_housekeeper_seeker");

    // Shared fields
    table.dropColumn("first_name");
    table.dropColumn("email_verified");
    table.dropColumn("last_name");
    table.dropColumn("slug");
    table.dropColumn("text_code");
    table.dropColumn("picture");
    table.dropColumn("headline");
    table.dropColumn("phone_number");

    // Fields for housekeeper
    table.dropColumn("is_housekeeper");
    table.dropColumn("description");
    table.dropColumn("hourly_rate");
    table.dropColumn("years_of_experience");
    table.dropColumn("has_own_transportation");
    table.dropColumn("has_own_equipment");
    table.dropColumn("has_own_supplies");
    table.dropColumn("requires_sponsorship");
  });
};
