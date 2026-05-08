import {
  createUserModel,
  loginUserModel,
} from "../models/authModel.js";

let loggedInUsers = new Set();

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await createUserModel(name, email, password);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUserModel(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    loggedInUsers.add(user.user_id);

    res.json({
      message: "Login successful",
      user_id: user.user_id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { user_id } = req.body;

    loggedInUsers.delete(user_id);

    res.json({
      message: "Logout successful",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};