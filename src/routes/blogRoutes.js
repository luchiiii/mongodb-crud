const express = require("express");
const {
  createNewBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogControllers");

const blogRouter = express.Router();

blogRouter.post("/", createNewBlog);
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:blogId", getSingleBlog);
blogRouter.put("/:blogId", updateBlog);
blogRouter.delete("/:blogId", deleteBlog);

module.exports = blogRouter;
