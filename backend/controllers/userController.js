const catchAysncErrors = require("../middleware/catchAysncErrors");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/userModel");

exports.registerUser = catchAysncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a if",
      url: "profilePicUrl",
    },
  });
  res.status(201).json({
    success: true,
    user,
  });
});
