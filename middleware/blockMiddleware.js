// List of blocked tools / clients
const blockedClients = ["curl", "wget", "httpie", "python"];

const blockClient = (req, res, next) => {
  const userAgent = (req.headers["user-agent"] || "").toLowerCase();

  const matched = blockedClients.find((tool) => userAgent.includes(tool));

  if (matched) {
    return res.status(403).json({
      message: `Access Denied: Requests from ${matched} are blocked`,
      client: "Blocked Client",
    });
  }

  next();
};

module.exports = {
  blockClient,
  blockedClients,
};

