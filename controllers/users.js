const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ObjectId} = require('mongoose').Types;

// LOGIN USER with mobile and isFarmer and return jwt
exports.UserLogin = async (req, res, next) => {
  const { mobile, isFarmer, password } = req.body;
  try {
    const fetched = await User.findOne({ mobile: mobile, isFarmer: isFarmer });
    if (!fetched) {
      return res.status(401).json({
        message: 'Authentication failed'
      });
    }
    const result = await bcrypt.compare(password, fetched.password);
    if (!result) {
      return res.status(401).json({
        message: 'Authentication failed'
      });
    }
    const token = jwt.sign(
      { mobile: fetched.mobile, isFarmer: fetched.isFarmer, userId: fetched._id },
      process.env.JWT_KEY,
      {
        expiresIn: "1h"
      })
    res.status(200).json({
      mobile: mobile,
      token: token,
      expiresIn: 3600,
      userId: fetched._id,
      status: 200
    });

  } catch (err) {
    next(err);
  }

}


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
        const { name, mobile, organization, isFarmer, password } = req.body;
        if(isFarmer && !organization) {
            return res.status(400).json({
                message: 'Organization is required'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = new User({
            _id: new ObjectId,
            name,
            mobile,
            organization,
            isFarmer,
            password :hashedPassword
        });
        await user.save()
        const token = jwt.sign(
          { mobile: user.mobile, isFarmer: user.isFarmer, userId: user._id },
          process.env.JWT_KEY,
          {
            expiresIn: "1h"
         })
        res.status(201).json({...user._doc, token});
    } catch (err) {
        next(err);
    }
}

// UPDATE USER
exports.update = async (req, res, next) => {
  try {
    const user = await User.updateOne({_id: req.params.id}, {$set: req.body});
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}



// DELETE USER
exports.delete = async (req, res, next) => {
  try {
    const user = await User.deleteOne(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}