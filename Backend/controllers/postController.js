const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { verify } = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { decode } = require("he");
const { categoryEnum, Post } = require("../models/post");

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

exports.post_create = [
  getBearerHeaderToSetTokenStringOnReq,
  // Validate body and sanitize fields.

  body("imageURL", "Image URL is required")
    .trim()

    .isLength({ min: 1 })
    .custom((value) => {
      if (!isURL(value)) {
        throw new Error("Invalid image URL");
      }
      return true;
    })
    .escape(),
  body("category", "category must be specified").trim().isIn(categoryEnum),
  body("description")
    .optional() // Allows the field to be absent
    .trim()
    .escape(),

  body("userId", "Invalid userId")
    .isMongoId() // Basic check for valid ObjectId format
    .custom(async (value) => {
      const user = await User.findById(value);
      if (!user) {
        throw new Error("User not found");
      }
      return true;
    }),
  // Process request after validation and sanitization.

  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    console.log(`errors :${JSON.stringify(errors)}`);

    console.log(`body content is:${JSON.stringify(req.body)}`);

    const post = new Post({
      userIdsWhoLiked: [],
      imageURL: req.body.imageURL,
      category: req.body.category,

      description: req.body.description,
      createdAt: new Date(),
      userId: req.body.userId,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      console.log(errors);
      res.status(422).json({ error: "Validation from header body failed" });
      return;
    } else {
      try {
        // Data from form is valid
        verify(req.token, "secretkey");
        await post.save();
        res.status(200).json({ post });
      } catch (err) {
        console.log(err);
      }
    }
  },
];

exports.post_list = asyncHandler(async (req, res, next) => {
  const { limit } = req.query;

  const options = {
    sort: { createdAt: -1 }, // Default sorting by createdAt descending
  };

  if (limit) {
    options.limit = parseInt(limit, 10);
  }

  const posts = await Post.find().setOptions(options).exec();
  console.log(`response is ${JSON.stringify(posts)}`);
  res.json(posts);
});

exports.post_schema = asyncHandler(async (req, res, next) => {
  //
  const schema = _schema.paths;
  const schemaDetails = Object.keys(schema)
    .filter((key) => !key.startsWith("_")) // Filter out keys starting with '_'
    .map((key) => {
      return {
        key: key,
        type: schema[key].instance,
        required: schema[key].isRequired ? true : false,
      };
    });
  console.log(`schema is ${JSON.stringify(schemaDetails)}`);
  //
  res.json(schemaDetails);
});

exports.post_update = [
  getBearerHeaderToSetTokenStringOnReq,
  // Validate body and sanitize fields.
  body("userIdsWhoLiked")
    .isArray()
    .custom(async (value) => {
      if (!Array.isArray(value)) {
        throw new Error("userIdsWhoLiked must be an array");
      }

      for (const userId of value) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          throw new Error("Invalid userId format");
        }

        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
      }

      return true;
    }),
  body("imageURL", "Image URL is required")
    .trim()

    .isLength({ min: 1 })
    .custom((value) => {
      if (!isURL(value)) {
        throw new Error("Invalid image URL");
      }
      return true;
    })
    .escape(),
  body("category", "category must be specified").trim().isIn(categoryEnum),
  body("description")
    .optional() // Allows the field to be absent
    .trim()
    .escape(),

  body("createdAt", "Invalid createdAt format").isISO8601(),
  body("userId", "Invalid userId")
    .isMongoId() // Basic check for valid ObjectId format
    .custom(async (value) => {
      const user = await User.findById(value);
      if (!user) {
        throw new Error("User not found");
      }
      return true;
    }),

  async (req, res, next) => {
    const updatedPost = new Post({
      userIdsWhoLiked: req.body.userIdsWhoLiked,
      imageURL: req.body.imageURL,

      category: req.body.category,
      description: req.body.description,
      createdAt: req.body.createdAt,
      userId: req.body.userId,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });

    console.log(`updated post ${updatedPost}  `);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(422).json({ error: "Validation failed" });
    } else {
      try {
        verify(req.token, "secretkey");
        await Post.findByIdAndUpdate(req.params.id, updatedPost, {});

        res.status(200).json({});
      } catch (error) {
        console.log("Error occurred:", error);
        res.status(500).json({ error: error });
      }
    }
  },
];

exports.post_delete = [
  getBearerHeaderToSetTokenStringOnReq,
  async (req, res, next) => {
    try {
      //if v erification vails , an error will be thrown
      verify(req.token, "secretkey");
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "post deleted" });
    } catch (error) {
      console.log(`error : ${error}`);
      next(error);
    }
  },
];
