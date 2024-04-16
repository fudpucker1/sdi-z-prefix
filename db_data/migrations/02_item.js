exports.up = function(knex) {
  // Create the item table
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.string('item_name');
    table.string('description');
    table.integer('quantity').unsigned();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('items');
};