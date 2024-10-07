const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  link: String
});

module.exports = mongoose.model('Project', projectSchema);

