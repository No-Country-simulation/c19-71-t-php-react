import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  description: { type: String, required: true },
  avatar: { type: String, required: true },
  // seguidores
  userIdsWhoFollow: [
    { type: Schema.Types.ObjectId, ref: "User", required: true },
  ],
  // seguidos
  userIdsfollowed: [
    { type: Schema.Types.ObjectId, ref: "User", required: true },
  ],
  postsIds: [{ type: Schema.Types.ObjectId, ref: "Post", required: true }],
});

// Export model
export default mongoose.model("User", UserSchema);
