const pool = require("./db");

async function checkQuestions() {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM questions");
    console.log("Total questions:", result.rows[0].count);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    pool.end();
  }
}

checkQuestions();
