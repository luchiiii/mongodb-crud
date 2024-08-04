const User = require("../models/userModel");

//create new user controller function
const createNewUser = async (req, res) => {
  //destructure user info from request body (req.body)
  const { firstName, lastName, email, dob, password } = req.body;
  try {
    //create a user data object from the user info
    const userData = {
      firstName,
      lastName,
      email,
      dob,
      password,
    };

    //create a new instance of user from User model
    const newUser = new User(userData);

    //save user data on database
    await newUser.save();

    //check if user info failed to save on the database
    if (!newUser) {
      return res.status(400).json({ error: "user creation failed" });
    }

    //return successful response if operation is successful
    return res
      .status(201)
      .json({ message: "user created successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    //check if there are no users in the database
    if (!users || users.length <= 0) {
      return res.status(400).json({ error: "no user found" });
    }

    //return success response if operation is successful
    return res.status(200).json({ message: "users found successfully", users });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

//get single user
const getSingleUser = async (req, res) => {
  //get dynamic user Id fron request parameters
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    //check if user is not found
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }

    return res.status(200).json({ message: "user found", user });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};

//update user
const updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!user) {
      return res.status(400).json({ error: "update failed" });
    }

    return res.status(200).json({ message: "user updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

//delete user
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }

    return res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
