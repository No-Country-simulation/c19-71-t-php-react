const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.user_list = (req, res, next) => {
  res.send("Hello World!");
};

//account creation
//no json token code here, only bcrypt
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
  body("email", "email must be specified").trim().isLength({ min: 1 }).escape(),
  body("name", "name must be specified").trim().isLength({ min: 1 }).escape(),
  body("lastName", "lastName must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    console.log(`body content is:${JSON.stringify(req.body)}`);

    const plainPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = new User({
      password: hashedPassword,
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      lastName: req.body.lastName,
    });

    const usernameTaken = await User.find({ username: req.body.username });

    if (!errors.isEmpty()) {
      // There are errors.
      console.log(errors);
      res.status(422).json({ error: "Validation failed" });
      return;
    } else if (usernameTaken.length >= 1) {
      console.log(`userTaken is ${typeof usernameTaken}`);
      res.status(409).json({ error: "Username taken" });
      return;
    } else {
      // Data from form is valid
      console.log(`data from from is valid!`);
      await user.save();
      console.log("user saved !");

      res.status(200).json({ user });
    }
  }),
];

//log in
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

    console.log("user sign in controller");
    console.log(`body content is:${JSON.stringify(req.body)}`);

    const user = await User.find({ username: req.body.username });
    console.log(req.body.username);
    if (!errors.isEmpty()) {
      // There are errors.

      res.status(422).json({ error: "Validation failed" });
      console.log(errors);
      return;
    } else if (user.length === 0) {
      console.log("user not found");
      res.status(404).json({ error: "User not found" });
      return;
    } else {
      // Data from form is valid
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          // Handle bcrypt error
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        if (result) {
          // Passwords match, user is authenticated
          console.log("passwords match");
          jwt.sign({ user }, "secretkey", (err, token) => {
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

//verify further auth after initial log in
exports.user_auth = [
  getBearerHeaderToSetTokenStringOnReq,
  asyncHandler(async (req, res, next) => {
    //authData is what i passed in the jwt.sign
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({ message: "auth passed", authData });
      }
    });
  }),
];
