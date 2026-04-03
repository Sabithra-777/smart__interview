const fs = require("fs");
const path = require("path");
const db = require("../db");

async function run() {
  const migrationsDir = path.join(__dirname);
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    console.log("Running migration", file);
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    await db.query(sql);
  }

  console.log("Migrations complete");
  process.exit(0);
}

run().catch((err) => {
  console.error("Migration failed", err);
  process.exit(1);
});
