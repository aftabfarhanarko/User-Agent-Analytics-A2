// Validations
const isVaid = (req, res, next) => {
  console.log(req.query.token);
  if (req.query.token === "123") {
    return next();
  }
  console.log("Not Valid....");
  return res.status(401).json({ message: "Unauthorized: Invalid token" });
};

const checkUserAgent = (req, res, next) => {
  console.log(req.headers["user-agent"]);
  next();
};

module.exports = {
  isVaid,
  checkUserAgent,
};
