var express = require("express");
var router = express.Router();

const post_controller = require("../controllers/postController");

/* GET users listing. */
router.get("/", post_controller.post_list);

router.get("/schema", post_controller.post_schema);

router.post("/", post_controller.post_create);

router.delete("/:id", post_controller.post_delete);

router.put("/:id", post_controller.post_update);

router.post("/like", post_controller.post_like);

router.post("/dislike", post_controller.post_dislike);

module.exports = router;
