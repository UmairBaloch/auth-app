import express from "express";
import { validate } from "../middleware/validator.js";
import {
  getUsersValidation,
  createUserValidation,
} from "../controller/user/user.validation.js";
import {
  createUser,
  findUser,
  getUsers,
  loginUser,
} from "../controller/user/user.controller.js";
import { verifyToken } from "../lib/jwtUtils.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res, next) => {
  try {
    return res.reply(await getUsers(res));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res) => {
  return res.reply(await findUser(req.params.id, res));
});

router.post("/", validate(createUserValidation), async (req, res, next) => {
  try {
    return res.reply(await createUser(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    return res.reply(await loginUser(req, res));
  } catch (error) {
    throw error;
  }
});

export default router;
