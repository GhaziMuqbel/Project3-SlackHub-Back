const User = require('../models/User');
const middleware = require('../middleware');
const axios = require('axios');

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).send({ status: 'Error', msg: 'Unauthorized' });
    }

    // Compare the password with the stored password digest
    let matched = await middleware.comparePassword(user.passwordDigest, password);

    if (matched) {
      let payload = {
        id: user._id,
        email: user.email,
        type: user.userType
      };
      let token = middleware.createToken(payload);
      return res.send({ user: payload, token });
    }

    res.status(401).send({ status: 'Error', msg: 'Unauthorized' });
  } catch (error) {
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' });
    throw error;
  }
};

const Register = async (req, res) => {
  console.log('register function');
  try {
    const { username, email, password, userType } = req.body;

    let passwordDigest = await middleware.hashPassword(password);

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered!');
    } else {
      const user = new User({
        username,
        email,
        passwordDigest,
        userType
      });

      await user.save();
      res.send(user);
    }
  } catch (error) {
    throw error;
  }
};

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    let user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).send({ status: 'Error', msg: 'User not found!' });
    }
    let matched = await middleware.comparePassword(user.passwordDigest, oldPassword);
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword);
      user = await User.findByIdAndUpdate(req.params.user_id, {
        passwordDigest
      }, { new: true });
      let payload = {
        id: user._id,
        email: user.email,
        type: user.userType
      };
      return res.send({ status: 'Password Updated!', user: payload });
    }
    res.status(401).send({ status: 'Error', msg: 'Old Password did not match!' });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    });
  }
};

const CheckSession = async (req, res) => {
  const { payload } = res.locals;
  res.send(payload);
};

module.exports = {
  Login,
  Register,
  CheckSession,
  UpdatePassword
};

