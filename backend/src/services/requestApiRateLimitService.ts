import rateLimit from "express-rate-limit";

const commonAPILimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests for each IP address
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  message: "number of allowed request rebased,  100 * 15 minutes", //handle the message to notify about rate limit
});

export default { commonAPILimiter };
