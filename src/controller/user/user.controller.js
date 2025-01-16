import User from "../../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../../lib/jwtUtils.js";

export const getUsers = async (res) => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    throw error;
  }
};

export const findUser = async (query, res) => {
  try {
    const user = await User.findOne({ _id: query });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (body) => {
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const payload = {
      ...body,
      password: hashedPassword,
    };
    const user = await User.create(payload);
    return {
      status: 201,
      message: "User created successfully",
      data: user,
    };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (req, res) => {
  console.log("req.body.email", req.body.email);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = await generateToken(
      { email: user.email, id: user._id, name: user.name },
      900
    );
    const data = {
      status: 200,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token: token,
    };

    return data;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
