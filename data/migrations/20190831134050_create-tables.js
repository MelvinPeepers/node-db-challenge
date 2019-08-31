
exports.up = function(knex) {
  return knex.schema.createTables('projects', tbl => {
      tbl.increments();
      tbl.string('animal_name', 256).notNullable();
      tbl.string('resource_name');
      tbl.boolean('project_completed');
  })
  .createTable('resources', tbl => {
      
  })
};

exports.down = function(knex) {
  
};
