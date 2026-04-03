const pool = require("./db");

async function checkUsers() {
  try {
    const result = await pool.query("SELECT id, name, email, role FROM users");
    console.log("Users:", result.rows);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    pool.end();
  }
}

checkUsers();
