exports.up = async function(knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id');
    table
      .string('username', 128)
      .notNullable()
      .unique();
    table.text('password').notNullable();
    table.string('department', 100).notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
};
