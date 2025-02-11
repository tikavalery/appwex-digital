// // controllers/userController.js
// const User = require("../models/userModel");

// const createUser = async (req, res) => {
//   const { first_name, last_name, email, password, role, company_id } = req.body;
//   const newUser = new User({ first_name, last_name, email, password, role, company_id });

//   try {
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// module.exports = {
//   createUser,
//   getUsers,
// };


////////////////////////////////////////////////



const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Create a new user (sign-up)
const createUser = async (req, res) => {
  const { first_name, last_name, email, password, role, company_id } = req.body;

  try {
    // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
      company_id,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users (admin-only access)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a user by ID (admin-only or self-view)
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user information (admin or self)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, role, company_id } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only if the user is updating themselves or admin is updating them
    if (user._id.toString() !== id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this user" });
    }

    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.company_id = company_id || user.company_id;

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user (admin-only)
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this user" });
    }

    await user.remove();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User login (authentication)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};
