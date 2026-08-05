import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT token
// Keep tokens minimal - only contain userId for authentication
// Authorization decisions are made by checking the database
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Short-lived access tokens
  });
};

// Set secure HttpOnly cookie with JWT
const setAuthCookie = (res, token) => {
  res.cookie('authToken', token, {
    httpOnly: true, // Prevents JavaScript access (XSS protection)
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Required for cross-origin!    maxAge: 60 * 60 * 1000, // 1 hour
    path: '/',
  });
};

// Register new user
export const register = async (req, res) => {
  try {
    let { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required',
      });
    }

    // Normalize email to prevent case-sensitivity issues
    email = email.trim().toLowerCase();
    name = name.trim();

    // Check if user already exists (using normalized email)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Create new user (password will be hashed by User model)
    const user = new User({
      email,
      password,
      name,
      plan: 'free',
      aiSummariesUsed: 0,
      aiMessagesUsed: 0,
    });

    await user.save();

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.getPublicData(),
      },
    });
  } catch (error) {
    console.error('Register error:', error);

    // Handle MongoDB duplicate key error (E11000)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `A user with this ${field} already exists`,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Error during registration',
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Normalize email (lowercase and trim)
    email = email.trim().toLowerCase();

    // Find user by email (include password for comparison)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.getPublicData(),
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error during login',
    });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: user.getPublicData(),
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching profile',
    });
  }
};

// Logout (clear auth cookie)
export const logout = async (req, res) => {
  try {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    });

    return res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error during logout',
    });
  }
};
