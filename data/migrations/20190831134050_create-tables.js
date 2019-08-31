
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
      tbl.integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      // this table must exist
      .inTable('projects')
  })
  // Intermediate table
  .createTable('project_resources', tbl => {
      tbl.integer('resource_id')
      .unsigned()
      .notNullable()
      .references('id')
    // this table must exist
      .inTable('resources')
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
