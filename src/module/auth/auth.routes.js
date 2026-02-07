const { Router } = require("express");
const {
  sendOtpHandler,
  checkOtpHandler,
  verifyRefreshToken,
} = require("./auth.service");
const { AuthGurd } = require("./auth.gurd");

const router = Router();

router.post("/send-otp", sendOtpHandler);
router.post("/check-otp", checkOtpHandler);
router.post("/refresh_token", verifyRefreshToken);

module.exports = {
  authRouter: router,
};
