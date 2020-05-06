const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    reset: {
      type: String
    },
    avatar: {
      type: String
    },
    selectedTheme: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = User = mongoose.model('user', UserSchema);
