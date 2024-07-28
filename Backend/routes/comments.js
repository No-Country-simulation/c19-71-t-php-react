var express = require("express");
var router = express.Router();

const comment_controller = require("../controllers/commentController");

/* GET users listing. */
router.post("/", post_controller.addComments);

router.get("/:id", post_controller.commentsList);

module.exports = router;
