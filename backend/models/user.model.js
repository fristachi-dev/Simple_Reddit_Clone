const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const mesSchema = new Schema({
//     text: String
// });

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  email: String,
  date: { type: Date, default: Date.now },
  timestamp: { type: Number, default: Date.now },
  posts: [
    {
      username: String,
      postSubject: String,
      postTitle: String,
      post: String,
      votes: Number,
      upVotes: [String],
      downVotes: [String],
      date: { type: Date, default: Date.now },
      timestamp: { type: Number, default: Date.now },
      comments: [
        {
          username: String,
          comment: String,
          date: { type: Date, default: Date.now },
          timestamp: { type: Number, default: Date.now },
        },
      ],
    },
  ],
});

//const Message = mongoose.model('Message', mesSchema);
const User = mongoose.model("User", userSchema);

//module.exports = Message;
module.exports = User;
