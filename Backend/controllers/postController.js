import Post, {
  find,
  schema as _schema,
  findByIdAndUpdate,
  findByIdAndDelete,
} from "../models/post";
import { categoryEnum } from "../models/post";
import asyncHandler from "express-async-handler";
import { verify } from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { decode } from "he";

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

export const post_create = [
  getBearerHeaderToSetTokenStringOnReq,
  // Validate body and sanitize fields.
  body("image", "image must be specified").trim().isLength({ min: 1 }).escape(),

  body("category", "category must be specified").trim().isIn(categoryEnum),
  body("description")
    .optional() // Allows the field to be absent
    .trim()
    .escape(),

  body("createdAt")
    .optional() // Allows the field to not be present
    .trim()
    .escape()
    .isBoolean()
    .withMessage("outOfStock must be a boolean value"),
  body("userId")
    .optional() // Allows the field to be absent
    .trim()
    .escape()
    .isNumeric()
    .withMessage("Flavours must be a valid number"),
  // Process request after validation and sanitization.

  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    console.log(`errors :${JSON.stringify(errors)}`);
    // Create a BookInstance object with escaped and trimmed data.git
    console.log(`body content is:${JSON.stringify(req.body)}`);

    const post = new Post({
      name: decode(req.body.name),
      price: req.body.price,
      imgUrl: decode(req.body.imgUrl),
      outOfStock: req.body.outOfStock,
      description: req.body.description,
      flavours: req.body.flavours,
    });

    if (!errors.isEmpty()) {
      // There are errors.

      res.status(422).json({ error: "Validation failed" });
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

export const post_list = asyncHandler(async (req, res, next) => {
  const posts = await find().sort({ price: -1 }).exec();
  console.log(`response is ${JSON.stringify(posts)}`);
  res.json(posts);
});

export const post_schema = asyncHandler(async (req, res, next) => {
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

export const post_update = [
  getBearerHeaderToSetTokenStringOnReq,
  // Validate body and sanitize fields.
  body("name", "name must be specified").trim().isLength({ min: 1 }).escape(),

  body("price", "price must be specified").trim().escape().isNumeric(),
  body("description")
    .optional() // Allows the field to be absent
    .trim()
    .escape(),
  body("imgUrl", "imgUrl must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("outOfStock", "outOfStock must be specified")
    .trim()
    .escape()
    .isBoolean(),
  body("flavours")
    .optional() // Allows the field to be absent
    .trim()
    .escape()
    .isNumeric()
    .withMessage("Flavours must be a valid number"),

  async (req, res, next) => {
    const updatedPost = new Post({
      name: decode(req.body.name),
      price: req.body.price,
      imgUrl: decode(req.body.imgUrl),
      description: req.body.description,
      outOfStock: req.body.outOfStock,
      flavours: req.body.flavours,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });

    console.log(`updated post ${updatedPost}  `);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ error: "Validation failed" });
    } else {
      try {
        verify(req.token, "secretkey");
        await findByIdAndUpdate(req.params.id, updatedPost, {});
        //delte missing flavours field
        if (!updatedPost.flavours) {
          await findByIdAndUpdate(
            req.params.id,
            { $unset: { flavours: 1 } },
            {}
          );
        }
        res.status(200).json({});
      } catch (error) {
        console.log("Error occurred bro:", error);
        res.status(500).json({ error: error });
      }
    }
  },
];

export const post_delete = [
  getBearerHeaderToSetTokenStringOnReq,
  async (req, res, next) => {
    try {
      //if v erification vails , an error will be thrown
      verify(req.token, "secretkey");
      await findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "post deleted" });
    } catch (error) {
      console.log(`error : ${error}`);
      next(error);
    }
  },
];
