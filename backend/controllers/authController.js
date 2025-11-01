import User from "../models/Users.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password, role });
  res.json({ token: generateToken(user._id, user.role) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({ token: generateToken(user._id, user.role), role: user.role });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
