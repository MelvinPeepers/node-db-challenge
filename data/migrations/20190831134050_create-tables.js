
exports.up = function(knex) {
  return knex.schema.createTables('projects', tbl => {
      tbl.increments();
      tbl.string('project_name', 256).notNullable();
      tbl.string('project_description', 256);
      tbl.boolean('project_completed').defaultTo(false);
  })
  .createTable('resources', tbl => {
      tbl.increments();
      tbl.string('resource_name', 256).notNullable();
      tbl.string('resource_description', 256);
  })
  .createTable('tasks', tbl => {
      tbl.increments();
      tbl.string('task_description', 256).notNullable();
      tbl.string('task_notes', 512);
      tbl.boolean('task_completed').defaultTo(false);
      // (foreign keys)
      tbl.integer('project_id') 
      .unsigned()
      .notNullable()
      .references('id')
      // this table must exist
      .inTable('projects')
  })
  // Intermediate table
  .createTable('project_resources', tbl => {
      tbl.integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
    // this table must exist
      .inTable('resources')
      tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('id')
        // this table must exist
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.primary(['project_id', 'resource_id']);
  })
};

exports.down = function(knex) {
  // reverse order of creation
  return knex.schema
  .dropTableIfExisit('tasks')
  .dropTableIfExisit('resources')
  .dropTableIfExisit('projects');
};

// http://knexjs.org/#Schema-defaultTo defaultTo - Sets the default value for the column on an insert.

exports.up = function(knex) {
    return knex.schema.createTable('zoos', tbl => {
      tbl.increments();
      tbl.string('zoo_name', 128).notNullable();
      tbl.string('address', 128).notNullable().unique();
    })
    .createTable('species', tbl => {
      tbl.increments();
      tbl.string('species_name', 128).notNullable().unique();
    })
    .createTable('animals', tbl => {
      tbl.increments();
      tbl.string('animal_name', 128).notNullable();
      // foreign key setup using knex
      tbl.integer('species_id')
        .unsigned()
        .notNullable()
        .references('id')
        // this table must exist
        .inTable('species')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('zoo_animals', tbl => {
      tbl.integer('zoo_id')
        .unsigned()
        .notNullable()
        .references('id')
        // this table must exist
        .inTable('zoos')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('animal_id')
        .unsigned()
        .notNullable()
        .references('id')
        // this table must exist
        .inTable('animals')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.primary(['zoo_id', 'animal_id']);
    });
  };