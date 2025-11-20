const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SALT_ROUNDS = 10;


// REGISTER

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

   
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

   
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

  
    const token = generateToken(user);

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (err) {
    next(err);
  }
};


// LOGIN

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (err) {
    next(err);
  }
};


// GENERATE TOKEN

function generateToken(user) {
  const payload = {
    userId: user._id,
    role: user.role
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
}

module.exports = {
  register,
  login
};
