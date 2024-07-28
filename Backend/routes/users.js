var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");

/* GET home page. */
router.get("/", user_controller.user_list);
console.log(`${process.env.NODE_ENV !== "production"}`);
if (process.env.NODE_ENV !== "production") {
  // Only enable this route in development
  console.log(`node env: ${process.env.NODE_ENV}`);
  router.post("/signup", user_controller.user_signup);
}

//sends token on 200
router.post("/signin", user_controller.user_signin);

router.post("/auth", user_controller.user_auth);

module.exports = router;
