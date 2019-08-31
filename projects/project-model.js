const db = require('../data/dbconfig.js');

module.exports = {
  find
};

function find() {
    return db('projects');
  }