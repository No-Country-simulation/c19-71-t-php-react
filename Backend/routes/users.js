var express = require("express");
const userController = require("../controllers/userController");

//////////////////////

const router = express.Router();

router.route("/").get(userController.getUsers);

//* Estas rutas tiene que ser protegidas, hay que crear un Middleware
// The user must be registered
router
  .route("/profile/:id")
  .get(userController.getUserProfile)
  .patch(userController.updateUserProfile);

module.exports = router;
