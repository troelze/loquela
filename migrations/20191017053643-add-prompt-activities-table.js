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
  db.createTable('prompt_activities', {
      id: { type: 'int', primaryKey: true },
      user_id: {
          type: 'int',
          references: { model: 'users', key: 'id' }
      },
      prompt_id: {
          type: 'int',
          references: { model: 'prompts', key: 'id' }
      },
      grade: 'string',
      feedback_text: 'string',
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
  db.dropTable('prompt_activities', callback);
};

exports._meta = {
  "version": 1
};
