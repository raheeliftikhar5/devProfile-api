import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { jwtSecret } from '../config/keys';
import User from '../models/User';
import validateRegister from '../validations/register';
import validateLogin from '../validations/login';


const router = express.Router();

// @route   GET /user/test
// @desc    Test user route
// @access  Public
router.get('/test', (req, res) => res.json('Test user is working'));

// @route   POST /user/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
  let {errors, isValid} = validateRegister(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({email: req.body.email}).then((user) => {
    if (user) {
      errors.email = 'Email already exist';
      res.status(400).json(errors);
      return;
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
          .then(user => res.json(user))
          .catch(error => res.send(500).json(error));
      })
    })
  })
});

// @route   POST /user/login
// @desc    Login user and return JWT token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email}).then(user => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatched => {
      if (!isMatched) {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
      const payload = {id: user.id, email: user.email};
      jwt.sign(payload, jwtSecret, {expiresIn: 3600}, (err, token) => {
        if (err) return res.status(500).json({error: err});

        res.json({
          success: true,
          token: `Bearer ${token}`,
        })
      });
    })
  })
});

// @route   GET /user/current
// @desc    Get current login user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({user: req.user});
});

export default router;