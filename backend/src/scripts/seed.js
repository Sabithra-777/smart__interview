const db = require("../db");
const seedQuestions = require("../data/seedQuestions");

async function seed() {
  try {
    // Clear existing data
    await db.query("TRUNCATE TABLE questions RESTART IDENTITY CASCADE;");
    console.log("Cleared existing questions.");

    let totalInserted = 0;
    for (const [category, questions] of Object.entries(seedQuestions)) {
      for (const q of questions) {
        const optionsJson = JSON.stringify(q.options);
        await db.query(
          `INSERT INTO questions (category, question, options, correct_answer) 
           VALUES ($1, $2, $3::jsonb, $4)`,
          [category, q.question, optionsJson, q.correctAnswer],
        );
        totalInserted++;
      }
    }
    console.log(
      `✅ Seeded ${totalInserted} questions across ${Object.keys(seedQuestions).length} categories.`,
    );
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    if (error.code === "42P01") {
      console.log('Table "questions" does not exist. Run migrations first.');
    }
  } finally {
    process.exit(0);
  }
}

seed();
