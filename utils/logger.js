const fs = require("fs");
const path = require("path");
const { UAParser } = require("ua-parser-js");
const { blockedClients } = require("../middleware/blockMiddleware");

const logFilePath = path.join(__dirname, "../logs/user-agents.json");

const saveUserAgent = (req) => {
  const userAgent = req.headers["user-agent"] || "Unknown";
  const ua = userAgent.toLowerCase();

  // Dynamic browser detection
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  let client = result.browser.name || "Unknown";

  // Detect API testing tools
  if (ua.includes("thunder client")) {
    client = "Thunder Client";
  } else if (ua.includes("postman")) {
    client = "Postman";
  }

  // Check if blocked client
  const isBlocked = blockedClients.some((tool) => ua.includes(tool));
  if (isBlocked) {
    client = "Blocked Client";
  }

  try {
    fs.mkdirSync(path.dirname(logFilePath), {
      recursive: true,
    });

    let logs = {
      totalRequests: 0,
      clients: {},
      requests: [],
    };

    if (fs.existsSync(logFilePath)) {
      const data = fs.readFileSync(logFilePath, "utf8");

      if (data.trim()) {
        logs = JSON.parse(data);
      }
    }

    logs.totalRequests = logs.totalRequests || 0;
    logs.clients = logs.clients || {};
    logs.requests = logs.requests || [];

    // Count every request
    logs.totalRequests++;

    logs.clients[client] = (logs.clients[client] || 0) + 1;

    // Save request details
    logs.requests.push({
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      client,
      userAgent,
      status: isBlocked ? "Blocked" : "Allowed",
    });

    fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), "utf8");

    console.log(`${client} | ${req.method} ${req.originalUrl}`);
  } catch (error) {
    console.error("Logger Error:", error.message);
  }
};

module.exports = saveUserAgent;
