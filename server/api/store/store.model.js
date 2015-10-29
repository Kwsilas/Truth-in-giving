'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StoreSchema = new Schema({
  label: String,
  amount: Number,
  value: Number,
  color: String
});

module.exports = mongoose.model('Store', StoreSchema);
