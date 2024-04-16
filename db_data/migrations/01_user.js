exports.up = function(knex) {
  // Create the user table
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('username');
    table.string('password')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};