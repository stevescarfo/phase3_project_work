const API_KEY = process.env.API_KEY || "foxkey";

function checkApiKey(req, res, next) {
  const apiKey = req.query.api_key || req.headers["x-api-key"];

  if (apiKey === API_KEY) {
    next();
  } else {
    res.status(403).send("Forbidden: Invalid API Key");
  }
}

module.exports = {
  checkApiKey,
};
