const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  comment: { type: String, required: true },
  createdAt: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
