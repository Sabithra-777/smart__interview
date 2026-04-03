const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRouter = require("./routes/auth");
const questionRouter = require("./routes/questions");
const resultRouter = require("./routes/results");
const adminRouter = require("./routes/admin");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/questions", questionRouter);
app.use("/api/results", resultRouter);
app.use("/api/admin", adminRouter);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.get("/", (req, res) => {
  res.json({ message: "Smart Interview backend running", api: "/api/health" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
