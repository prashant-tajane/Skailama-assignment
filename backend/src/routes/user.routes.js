import express from "express";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
const router = express.Router();

const fetchAndStoreUsers = async () => {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    const users = data.users.slice(0, 20);

    await User.deleteMany({});

    const userPromises = users.map(async (user) => {
      const newUser = new User({
        name: user.username,
        email: user.email,
        image: user.image,
      });
      return newUser.save();
    });

    await Promise.all(userPromises);
    console.log("Users saved to MongoDB");
  } catch (error) {
    console.error("Error fetching or saving users:", error);
  }
};

router.get("/fetch-users", async (req, res) => {
  await fetchAndStoreUsers();
  res.status(200).json({
    success: true,
    message: "Users fetched and saved to MongoDB",
  });
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return next(new ErrorHandler(404, "User not found"));
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
});

export default router;
