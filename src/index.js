import express from "express";
import connectDB from "./config/db.js";
import indexRoute from "./routes/index.js";
import userRoute from "./routes/users.js";

const app = express();
app.use(express.json());
const PORT = 5005;
app.use((req, res, next) => {
  res.reply = (data) =>
    res.status(200).send({
      status: 200,
      message: "Success",
      data: data,
    });
  next();
});

app.use("/", indexRoute);
app.use("/user", userRoute);

app.use((err, req, res, next) => {
  res.status(err?.status || 500).send({
    status: err?.status || 500,
    message: err?.message || "Something went wrong",
  });
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
