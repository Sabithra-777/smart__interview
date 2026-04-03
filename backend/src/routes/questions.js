const express = require("express");
const db = require("../db");
const { requireAuth } = require("../middleware/auth");
const router = express.Router();

router.get("/:category", requireAuth, async (req, res) => {
  const { category } = req.params;
  try {
    const result = await db.query(
      "SELECT id, category, question, options, correct_answer, difficulty FROM questions WHERE category = $1 ORDER BY id LIMIT 10",
      [category],
    );
    const questions = result.rows.map((q) => ({
      _id: q.id.toString(),
      category: q.category,
      question: q.question,
      options: q.options,
      difficulty: q.difficulty || "Medium",
      correctAnswer: q.options.indexOf(q.correct_answer),
    }));

    res.json({ questions, timeLimit: 600 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
