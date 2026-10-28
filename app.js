const express = require("express");
const app = express();
const port = 3000;

const userRouter = require("./router/user");
const events = require("./router/event");
const analytics = require("./router/analytics");
const { renderAnalyticsChart } = require("./controllers/analyticsController");

const { isValid, checkUserAgent } = require("./middleware/usermiddleware");
const { blockClient } = require("./middleware/blockMiddleware");

const saveUserAgent = require("./utils/logger");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User-Agent analytics for all routes
app.use((req, res, next) => {
  saveUserAgent(req);
  next();
});

// Block unwanted clients middleware
app.use(blockClient);

// Routes
app.get("/api/analytic", renderAnalyticsChart);
app.use("/api/user", isValid, checkUserAgent, userRouter);
app.use("/api/event", events);
app.use("/api/analytics", analytics);

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
