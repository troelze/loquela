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
  return db.insert(
    'users', 
    [{'email': 'lauren@test.com', 'password_hash': '1234abcd'},
    {'email': 'hudsonn@test.com', 'password_hash': '1234abcd'},
    {'email': 'tres@test.com', 'password_hash': '1234abcd'}], 
    callback
  );
  // return db.insert(
  //   'users', 
  //   ['email', 'password_hash'],
  //   ['lauren@test.com', '1234abcd'],
  //   callback
  // );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  'version': 1
};
