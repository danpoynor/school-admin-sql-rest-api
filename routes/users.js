'use strict';
const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');
const { Course, User } = require('../models');

// Return all properties and values for the currently authenticated user
router.get('/', authenticateUser, asyncHandler(async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.currentUser.id
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    });
    if (user) {
      // Get list of course titles for the current user
      const courses = await Course.findAll({
        where: {
          userId: req.currentUser.id
        },
        attributes: ['title']
      });
      // Add course titles to the user object
      user = { ...user.dataValues, courses: courses };
      res.status(200).json(user);
    } else {
      res.status(404).json({ "message": "User not found" });
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

// Create a new user
router.post('/', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    // Don't return anything except 201 status code
    res.status(201).location('/').end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

module.exports = router;
