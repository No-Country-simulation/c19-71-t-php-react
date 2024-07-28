const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.user_list = function (req, res, next) {
  res.render("index", { title: "Express" });
};

exports.user_signup = [
  // Validate body and sanitize fields.
  body("username", "username must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "password must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    console.log(`body content is:${JSON.stringify(req.body)}`);

    const plainPassword = req.body.password;
    const hashedPassword = await hash(plainPassword, 10);

    const user = new User({
      password: hashedPassword,
      username: req.body.username,
    });

    const usernameTaken = await find({ username: req.body.username });

    if (!errors.isEmpty()) {
      // There are errors.

      res.status(422).json({ error: "Validation failed" });
      return;
    } else if (usernameTaken.length >= 1) {
      console.log(`userTaken is ${typeof usernameTaken}`);
      res.status(409).json({ error: "Username taken" });
      return;
    } else {
      // Data from form is valid
      await user.save();
      console.log("user saved !");

      res.status(200).json({ user });
    }
  }),
];

exports.user_signin = [
  // Validate body and sanitize fields.
  body("username", "username must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "password must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    console.log("user sign in controller");
    console.log(`body content is:${JSON.stringify(req.body)}`);

    const user = await find({ username: req.body.username });
    console.log(req.body.username);
    if (!errors.isEmpty()) {
      // There are errors.

      res.status(422).json({ error: "Validation failed" });
      return;
    } else if (user.length === 0) {
      console.log("user not found");
      res.status(404).json({ error: "User not found" });
      return;
    } else {
      // Data from form is valid
      compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          // Handle bcrypt error
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        if (result) {
          // Passwords match, user is authenticated
          console.log("passwords match");
          sign({ user }, "secretkey", (err, token) => {
            if (err) {
              // Handle error
              res.status(500).json({ error: "Error signing the token" });
            } else {
              res.status(200).json({ token });
              console.log("token sent with User data");
            }
          });

          /*     res.status(200).json({ user }); */
        } else {
          // Passwords don't match, authentication failed
          res.status(401).json({ error: "Authentication failed" });
        }
      });
    }
  }),
];

//format of token
//Authorization: Bearer <token>
//we add the word Bearer because is the standard
function getBearerHeaderToSetTokenStringOnReq(req, res, next) {
  console.log("function getBearerHeaderToSetTokenStringOnReq");
  const bearerHeader = req.headers?.authorization;
  if (typeof bearerHeader !== "undefined") {
    //bearer header format : Bearer <token>
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

exports.user_auth = [
  getBearerHeaderToSetTokenStringOnReq,
  asyncHandler(async (req, res, next) => {
    //authData is what i passed in the jwt.sign
    verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({ message: "auth passed", authData });
      }
    });
  }),
];

//////////////////////////////

//* Get user profile
// @route GET /users/profile/id
// @access Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("💥User not found");
  }

  // Send Response 🛩️
  res.status(200).json({
    status: "success",
    data: { user },
  });
});

//* Get users
// @route GET  /users
// @access Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  if (!users) {
    res.status(404);
    throw new Error("💥Users not found");
  }

  // Send Response 🛩️
  res.status(200).json({
    status: "success",
    data: { users },
  });
});

//* Update user profile
// @route PATCH  /users/profile/id
// @access Private
exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const options = { new: true, runValidators: false };
  const user = await User.findByIdAndUpdate(req.params.id, req.body, options);

  if (!user) {
    res.status(404);
    throw new Error("💥User not found");
  }

  // Send Response 🛩️
  res.status(200).json({
    status: "success",
    data: { user },
  });
});
