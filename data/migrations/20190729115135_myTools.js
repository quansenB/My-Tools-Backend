exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments();
      table
        .string("username")
        .unique()
        .notNullable();
      table.string("location");
    })
    .createTable("tools", table => {
      table.increments();
      table.string("name").notNullable();
      table.string("description");
      table
        .integer("owner_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("borrower_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("borrowing_history", table => {
      table.increments();
      table
        .integer("owner_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("borrower_id")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table
        .integer("tool_id")
        .references("id")
        .inTable("tools")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table.string("status").notNullable();
      table.string("review_borrower");
      table.string("review_owner");
      table.dateTime("start_date")
      table.dateTime("end_time");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("borrowing_history")
    .dropTableIfExists("tools")
    .dropTableIfExists("users");
};
