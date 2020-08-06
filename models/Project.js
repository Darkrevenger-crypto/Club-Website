const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  //add url to the project lateer on

  username: {
    type: String,

    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  isCompleted: {
    type: Boolean,

    default: false,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('project', ProjectSchema);
