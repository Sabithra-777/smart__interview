const express = require("express");
const db = require("../db");
const { requireAuth } = require("../middleware/auth");
const router = express.Router();

function normalizeOptions(options) {
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
}

router.post("/submit", requireAuth, async (req, res) => {
  const { category, answers } = req.body;
  const userId = req.user.id;

  if (!category || !Array.isArray(answers) || answers.length === 0) {
    return res
      .status(400)
      .json({ message: "category and non-empty answers required" });
  }

  try {
    const questionIds = answers
      .map((a) => parseInt(a.questionId, 10))
      .filter((id) => Number.isInteger(id) && id > 0);

    if (!questionIds.length) {
      return res.status(400).json({ message: "No valid question IDs" });
    }

    const qResult = await db.query(
      "SELECT id, options, correct_answer FROM questions WHERE id = ANY($1::int[])",
      [questionIds],
    );

    const correctMap = new Map(
      qResult.rows.map((q) => {
        const opts = normalizeOptions(q.options);
        const idx = opts.indexOf(q.correct_answer);
        return [q.id.toString(), idx >= 0 ? idx : 0];
      }),
    );

    let score = 0;
    answers.forEach((ans) => {
      const qid = ans.questionId?.toString();
      const sel = Number(ans.selectedAnswer);
      if (Number.isNaN(sel)) return;
      if (correctMap.get(qid) === sel) score++;
    });

    const percentage = (score / answers.length) * 100;
    const result = await db.query(
      "INSERT INTO results (user_id, category, score, total_questions, percentage) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [userId, category, score, answers.length, percentage],
    );

    res.json({ result: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", requireAuth, async (req, res) => {
  const userId = req.user.id;
  try {
    const rows = await db.query(
      "SELECT id, category, score, total_questions, percentage, created_at FROM results WHERE user_id=$1 ORDER BY created_at DESC",
      [userId],
    );
    const results = rows.rows.map((r) => ({
      ...r,
      _id: r.id.toString(),
      createdAt: r.created_at,
    }));
    res.json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/analytics", requireAuth, async (req, res) => {
  const userId = req.user.id;
  try {
    const rows = await db.query(
      "SELECT category, score, percentage, created_at FROM results WHERE user_id=$1 ORDER BY created_at",
      [userId],
    );
    const userResults = rows.rows;

    const topicPerformance = {};
    const scoreHistory = [];

    userResults.forEach((r) => {
      if (!topicPerformance[r.category])
        topicPerformance[r.category] = {
          totalTests: 0,
          totalScore: 0,
          bestScore: 0,
        };
      topicPerformance[r.category].totalTests++;
      topicPerformance[r.category].totalScore += r.percentage;
      topicPerformance[r.category].bestScore = Math.max(
        topicPerformance[r.category].bestScore,
        r.percentage,
      );
      scoreHistory.push({
        category: r.category,
        score: r.percentage,
        date: r.created_at,
      });
    });

    Object.keys(topicPerformance).forEach((cat) => {
      topicPerformance[cat].averageScore = (
        topicPerformance[cat].totalScore / topicPerformance[cat].totalTests
      ).toFixed(2);
    });

    const weaknesses = Object.keys(topicPerformance)
      .filter((cat) => parseFloat(topicPerformance[cat].averageScore) < 60)
      .map((cat) => ({
        topic: cat,
        averageScore: topicPerformance[cat].averageScore,
        testsAttempted: topicPerformance[cat].totalTests,
      }));

    const overallAverage =
      Object.keys(topicPerformance).length > 0
        ? (
            Object.values(topicPerformance).reduce(
              (acc, cur) => acc + parseFloat(cur.averageScore),
              0,
            ) / Object.keys(topicPerformance).length
          ).toFixed(2)
        : 0;

    res.json({
      analytics: {
        totalTests: userResults.length,
        overallAverage,
        topicPerformance,
        scoreHistory: scoreHistory.reverse(),
        weaknesses,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
