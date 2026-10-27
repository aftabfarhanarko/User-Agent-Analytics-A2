const express = require("express");
const app = express();
const port = 3000;

const userRouter = require("./router/user");
const events = require("./router/event");
const { isVaid, checkUserAgent } = require("./middleware/usermiddleware");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", isVaid, checkUserAgent, userRouter);
app.use("/api/event", events);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
