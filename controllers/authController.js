// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register user
exports.registerUser = async (req, res, next) => {
  const { userName, email, password, address, phone, usertype } = req.body;

  console.log("req :::", req.body);

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }


    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      usertype
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error registering",
      error,
    });
  }
};

// Login user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body);

  try {
    //validation

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide a email OR password"
      })
    }
    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log(isMatch);

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });
    console.log(token);
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        userName: user.userName,
        email: user.email,
        usertype: user.usertype,
        profile: user.profile,
        userId: user.userId
      },
    });

    // res.json({
    //   message: 'Login successful',
    //   statusCode: 200,
    //   token,
    //   user: {
    //     userName: user.userName,
    //     email: user.email,
    //     usertype: user.usertype,
    //     profile: user.profile,
    //   },
    // });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
