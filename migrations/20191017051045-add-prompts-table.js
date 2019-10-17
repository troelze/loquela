'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('prompts', {
      id: { type: 'int', primaryKey: true },
      name: 'string',
      text: 'string',
      created_at: {
          type: 'timestamp',
          notNull: true,
          defaultValue: new String('CURRENT_TIMESTAMP')
      }, 
      updated_at: {
          type: 'timestamp',
          notNull: true,
          defaultValue: new String('CURRENT_TIMESTAMP')
      }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('prompts', callback);
};

exports._meta = {
  "version": 1
};
