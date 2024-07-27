const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const categoryEnum = ["Movies", "Sports", "Anime"];
const PostSchema = new Schema({
  userIdsWhoLiked: [
    { type: Schema.Types.ObjectId, ref: "User", required: true },
  ],
  image: { type: String, required: true },
  category: {
    type: String,
    enum: categoryEnum,
    required: true, // Optional: If category is mandatory
  },
  description: { type: String, required: false },
  createdAt: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  commentsIds: [
    { type: Schema.Types.ObjectId, ref: "Comment", required: false },
  ],
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
