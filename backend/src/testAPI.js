const fetch = require("node-fetch");

async function testAPI() {
  try {
    // Test login
    const loginRes = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@example.com",
        password: "admin123",
      }),
    });
    const loginData = await loginRes.json();
    console.log("Login response:", loginData);

    if (!loginData.token) {
      console.log("No token received");
      return;
    }

    // Test get questions
    const questionsRes = await fetch(
      "http://localhost:5000/api/admin/questions",
      {
        headers: { Authorization: `Bearer ${loginData.token}` },
      },
    );
    const questionsData = await questionsRes.json();
    console.log("Questions response:", questionsData);
    console.log(
      "Number of questions:",
      questionsData.questions ? questionsData.questions.length : 0,
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

testAPI();
