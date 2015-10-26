'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StoreSchema = new Schema({
  name: String,
  amount: Number,
  giving: Number
});

module.exports = mongoose.model('Store', StoreSchema);
