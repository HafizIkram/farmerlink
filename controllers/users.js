const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// GET ALL USERS
exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

// GET ONE USER
exports.getOne = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

// CREATE USER
exports.create = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

// UPDATE USER
exports.update = async (req, res, next) => {
    try {
        const user = await User.updateOne(req.params.id, req.body);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

// LOGIN USER
exports.login = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;

    // Find user by email
    const user = await User.findOne({ mobile });

    // If user not found, return error
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }

    // Compare password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);

    // If password does not match, return error
    if (!isMatch) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        mobile: user.mobile,
        userId: user._id
      },
      process.env.JWT_KEY,
      {
        expiresIn: '24h'
      }
    );

    // Return token in response
    res.status(200).json({
      token,
      expiresIn: 3600,
      userId: user._id
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Auth failed',
      error
    });
  }
};

// DELETE USER
exports.delete = async (req, res, next) => {
    try {
        const user = await User.deleteOne(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}