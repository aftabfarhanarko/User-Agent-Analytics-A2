const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/user-agents.json");

// Analytic route
const getAllAnalytics = (req, res) => {
  if (!fs.existsSync(logFilePath)) {
    return res.json({
      totalRequests: 0,
      clients: {},
      requests: [],
    });
  }

  const data = fs.readFileSync(logFilePath, "utf8");

  res.json(
    data.trim()
      ? JSON.parse(data)
      : {
          totalRequests: 0,
          clients: {},
          requests: [],
        },
  );
};

module.exports = { getAllAnalytics };
