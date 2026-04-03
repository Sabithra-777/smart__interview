const express = require("express");
const db = require("../db");
const seedQuestions = require("../data/seedQuestions");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const router = express.Router();

const normalizeOptions = (options) => {
  if (Array.isArray(options)) return options;
  if (typeof options === "string") {
    try {
      const parsed = JSON.parse(options);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

const mapDbQuestion = (q) => {
  const options = normalizeOptions(q.options);
  const correctIndex = options.indexOf(q.correct_answer);

  return {
    _id: q.id.toString(),
    id: q.id.toString(),
    category: q.category,
    question: q.question,
    options,
    difficulty: q.difficulty || "Medium",
    correctAnswer: correctIndex >= 0 ? correctIndex : 0,
  };
};

const resolveCorrectAnswerValue = (options, correctAnswer) => {
  const normalizedOptions = normalizeOptions(options);
  if (normalizedOptions.length === 0) return undefined;

  if (typeof correctAnswer === "number") {
    if (normalizedOptions[correctAnswer] !== undefined) {
      return normalizedOptions[correctAnswer];
    }
  }

  if (typeof correctAnswer === "string") {
    const idx = normalizedOptions.indexOf(correctAnswer);
    if (idx !== -1) return correctAnswer;
    const asInt = parseInt(correctAnswer, 10);
    if (!Number.isNaN(asInt) && normalizedOptions[asInt] !== undefined) {
      return normalizedOptions[asInt];
    }
  }

  return normalizedOptions[0];
};

router.use(requireAuth, requireAdmin);

router.post("/seed-questions", async (req, res) => {
  try {
    let insertedCount = 0;

    for (const [category, items] of Object.entries(seedQuestions)) {
      for (const item of items) {
        const existing = await db.query(
          "SELECT id FROM questions WHERE category=$1 AND question=$2",
          [category, item.question],
        );

        if (existing.rows.length) continue;

        await db.query(
          "INSERT INTO questions (category, question, options, correct_answer) VALUES ($1, $2, $3, $4)",
          [
            category,
            item.question,
            JSON.stringify(item.options),
            item.correctAnswer,
          ],
        );

        insertedCount += 1;
      }
    }

    res.json({ message: `Seed completed`, insertedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Seeding failed" });
  }
});

router.get("/questions", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, category, question, options, correct_answer, difficulty FROM questions ORDER BY id",
    );
    const questions = result.rows.map(mapDbQuestion);
    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/questions", async (req, res) => {
  const {
    category,
    question,
    options,
    correctAnswer,
    difficulty = "Medium",
  } = req.body;
  if (!category || !question || !options || correctAnswer === undefined) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const correctAnswerValue = resolveCorrectAnswerValue(options, correctAnswer);

  try {
    const existing = await db.query(
      "SELECT id FROM questions WHERE category=$1 AND question=$2",
      [category, question],
    );
    if (existing.rows.length) {
      return res.status(409).json({ message: "Question already exists" });
    }

    const result = await db.query(
      "INSERT INTO questions (category, question, options, correct_answer, difficulty) VALUES ($1,$2,$3,$4,$5) RETURNING id, category, question, options, correct_answer, difficulty",
      [
        category,
        question,
        JSON.stringify(normalizeOptions(options)),
        correctAnswerValue,
        difficulty,
      ],
    );

    res.json({ question: mapDbQuestion(result.rows[0]) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/questions/:id", async (req, res) => {
  const { id } = req.params;
  const {
    category,
    question,
    options,
    correctAnswer,
    difficulty = "Medium",
  } = req.body;

  const correctAnswerValue = resolveCorrectAnswerValue(options, correctAnswer);

  try {
    const result = await db.query(
      "UPDATE questions SET category=$1, question=$2, options=$3, correct_answer=$4, difficulty=$5 WHERE id=$6 RETURNING id, category, question, options, correct_answer, difficulty",
      [
        category,
        question,
        JSON.stringify(normalizeOptions(options)),
        correctAnswerValue,
        difficulty || "Medium",
        id,
      ],
    );

    if (!result.rowCount)
      return res.status(404).json({ message: "Question not found" });

    res.json({ question: mapDbQuestion(result.rows[0]) });
  } catch (error) {
    console.error(
      "PUT /questions/:id error",
      { id, category, question, options, correctAnswer, correctAnswerValue },
      error,
    );
    res.status(500).json({ message: "Server error", detail: error.message });
  }
});

router.delete("/questions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM questions WHERE id=$1", [id]);
    if (!result.rowCount)
      return res.status(404).json({ message: "Question not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/results", async (req, res) => {
  try {
    const results = await db.query(`
      SELECT r.id, r.category, r.score, r.total_questions, r.percentage, r.created_at, u.id AS user_id, u.name, u.email
      FROM results r
      JOIN users u ON u.id = r.user_id
      ORDER BY r.created_at DESC
    `);

    const data = results.rows.map((r) => ({
      id: r.id,
      category: r.category,
      score: r.score,
      totalQuestions: r.total_questions,
      percentage: r.percentage,
      createdAt: r.created_at,
      user: { id: r.user_id, name: r.name, email: r.email },
    }));

    res.json({ results: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
