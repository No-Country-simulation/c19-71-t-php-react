var express = require("express");
var router = express.Router();

const comment_controller = require("../controllers/commentController");

/* GET users listing. */
router.post("/", comment_controller.addComments);

router.get("/:postId", comment_controller.commentsList);

module.exports = router;
