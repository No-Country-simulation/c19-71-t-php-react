const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  description: { type: String, required: false },
  avatar: {
    type: String,
    required: false,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
  }, // Set default avatar
  //seguidores
  userIdsWhoFollow: [
    { type: Schema.Types.ObjectId, ref: "User", required: true },
  ],
  //seguidos
  userIdsfollowed: [
    { type: Schema.Types.ObjectId, ref: "User", required: true },
  ],
});

// Export model
module.exports = mongoose.model("User", UserSchema);
