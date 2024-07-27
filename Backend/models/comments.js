import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
  comment: { type: String, required: true },
  createdAt: { type: Date, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

// Export model
export default mongoose.model("Post", PostSchema);
