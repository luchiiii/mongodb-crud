const Blog = require("../models/blogModel");

//create new blog
const createNewBlog = async (req, res) => {
  //desctructure blog info from request body
  const { title, content } = req.body;
  try {
    //create a blog data object from the blog info
    const blogData = {
      title,
      content,
    };
    //create a new instance of blog from Blog model
    const newBlog = new Blog(blogData);

    //save blog data on database
    await newBlog.save();

    //check if blog info failed to save on database
    if (!newBlog) {
      return res.status(400).json({ error: "Blog creation failed" });
    }

    return res
      .status(201)
      .json({ message: "Blog creation successful", newBlog });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

//get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    //check if there are no blogs in the database
    if (!blogs || blogs.length <= 0) {
      return res.status(400).json({ error: "Blogs not found" });
    }
    return res.status(200).json({ message: "Blogs found", blogs });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

//get single blog
const getSingleBlog = async (req, res) => {
  //get dynamic blog Id from request parameters
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);

    //check if blog is not found
    if (!blog) {
      return res.status(400).json({ error: "Blog not found" });
    }
    return res.status(200).json({ message: " Blog found", blog });
  } catch (error) {
    return res.status(500).json({ error: " Something went wrong" });
  }
};

//update blog
const updateBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findByIdAndUpdate(blogId, req.body);

    //check if blog is updated
    if (!blog) {
      return res.status(400).json({ error: "Blog update failed" });
    }
    return res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

//delete blog
const deleteBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(blogId);

    //check is blog is deleted successfully
    if (!blog) {
      return res.status(400).json({ error: "Blog deletion failed" });
    }
    return res.status(200).json({ message: "Blog deleted successfully", blog });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  createNewBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
