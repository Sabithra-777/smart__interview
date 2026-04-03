const pool = require("./db");
const bcrypt = require("bcrypt");

async function insertAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await pool.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING",
      ["Admin", "admin@example.com", hashedPassword, "admin"],
    );
    console.log("Admin user inserted or already exists");
  } catch (error) {
    console.error("Error inserting admin:", error);
  } finally {
    pool.end();
  }
}

insertAdmin();
