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
  db.createTable('answers', {
    id: 
    { 
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true 
    },
    user_id: 
    {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'answers_user_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    prompt_id: 
    {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'answers_prompt_id_fk',
        table: 'prompts',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    text: 'string',
    created_at: 
    {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP')
    }, 
    updated_at: 
    {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('answers', callback);
};

exports._meta = {
  'version': 1
};
