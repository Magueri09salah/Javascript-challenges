const express = require("express");
const router = express.Router();


const postControllers = require("../controllers/postController");





router.get("/", postControllers.getPosts);
router.get("/search", postControllers.getPostsSearch);
router.get("/:id", postControllers.getPostsId);
router.post("/",postControllers.postCreatePost);
router.put("/:id",postControllers.putUpdatePost);
router.put("/:id",postControllers.deletePost);



module.exports = router;
