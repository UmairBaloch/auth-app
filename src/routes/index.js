import express from "express";
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/user");
});

export default router;
