const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    cityId: {
      type: Number,
      required: true
    },
    scenario: {
      type: String,
      required: true
    },
    dataSet: {
      type: String,
      required: true
    },
    dataModels: [
      {
        name: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = Project = mongoose.model('project', ProjectSchema);
