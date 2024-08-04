const express = require("express");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");

const app = express();

//global middleware to accept json data
app.use(express.json());

//base route for  server health check
app.get("/", (req, res) => {
  res.json({ message: "server is live" });
});

//global middleware to route to the created router
app.use("/users", userRouter);

//global middleware to route to the created router
app.use("/blogs", blogRouter);

module.exports = app;
