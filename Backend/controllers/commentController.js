const { Post } = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comments");
const asyncHandler = require("express-async-handler");
const { verify } = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const isURL = require("validator/lib/isURL");

function getBearerHeaderToSetTokenStringOnReq(req, res, next) {
  const bearerHeader = req.headers?.authorization;
  if (typeof bearerHeader !== "undefined") {
    //bearer header format : Bearer <token>

    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();
  } else {
    next();
  }
}

exports.addComments = [
  getBearerHeaderToSetTokenStringOnReq,
  // Validate body and sanitize fields.

  body("comment", "Comment is required").trim().escape().isLength({ min: 1 }),

  body("userId", "Invalid userId")
    .isMongoId() // Basic check for valid ObjectId format
    .custom(async (value) => {
      const user = await User.findById(value);
      if (!user) {
        throw new Error("User not found");
      }
      return true;
    }),
  body("postId", "Invalid postId")
    .isMongoId() // Basic check for valid ObjectId format
    .custom(async (value) => {
      const post = await Post.findById(value);
      if (!post) {
        throw new Error("Post not found");
      }
      return true;
    }),
  // Process request after validation and sanitization.

  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    console.log(`errors :${JSON.stringify(errors)}`);

    console.log(`body content is:${JSON.stringify(req.body)}`);

    const comment = new Comment({
      comment: req.body.comment,
      createdAt: new Date(),
      userId: req.body.userId,
      postId: req.body.postId,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      console.log(errors);
      res.status(422).json({ error: "Validation failed" });
      return;
    } else {
      try {
        // Data from form is valid
        verify(req.token, "secretkey");
        await comment.save();
        res.status(200).json({ comment });
      } catch (err) {
        console.log(err);
      }
    }
  },
];

exports.commentsList = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comment.find({ postId: postId });
  console.log(comments);
  res.json(comments);
});
