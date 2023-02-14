const express = require("express");
const router = express.Router();

const feedController = require("../controllers/feed");
const { validatePosts } = require("../validations/posts");

const isAuth = require("../middleware/is-auth");

router.get("/posts", isAuth, feedController.getPosts);

router.post("/posts", isAuth, validatePosts, feedController.createPosts);

router.get("/posts/:postId", isAuth, feedController.getPost);

router.put("/posts/:postId", isAuth, validatePosts, feedController.updatePost);

router.delete("/posts/:postId", isAuth, feedController.deletePost);

module.exports = router;
