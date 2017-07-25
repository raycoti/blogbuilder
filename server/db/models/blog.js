'use strict'
const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('blogs', {
 name: Sequelize.STRING,
 body: {
   type: Sequelize.TEXT,
 } 
})