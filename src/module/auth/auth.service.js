const createHttpError = require("http-errors");
const { UserModel, OtpCode } = require("../user/user.model");
const { Op, where } = require("sequelize");
const { sendSms } = require("../sms/veriification");
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const RefreshTokenUser = require("../user/refreshToken.model");
config();

async function sendOtpHandler(req, res, next) {
  try {
    const { mobile } = req.body;
    let code = Math.floor(Math.random() * 99999 - 10000) + 10000;
    let user = await UserModel.findOne({ where: { mobile } });
    const now = new Date();

    if (!user) {
      user = await UserModel.create({ mobile });
    }

    let otp = await OtpCode.findOne({
      where: { userId: user.id },
      order: [["id", "DESC"]],
    });

    if (otp && otp.expires_in > now) {
      const remaining = Math.ceil((otp.expires_in - now) / 1000);

      return res.status(429).json({
        message: `کد قبلاً ارسال شده. ${remaining} ثانیه دیگر تلاش کنید`,
      });
    }
    await OtpCode.create({
      userId: user.id,
      code,
      expires_in: new Date(Date.now() + 1000 * 60 * 2),
    });

    // await sendSms(mobile, code);

    return res.json({
      message: "کد تایید با موفقیت ارسال شد.",
    });
  } catch (error) {
    next(error);
  }
}

async function checkOtpHandler(req, res, next) {
  try {
    const { mobile, code } = req.body;
    let userId = null;
    let user = await UserModel.findOne({
      where: { mobile },
      include: [{ model: OtpCode, as: "otp" }],
    });

    if (!user) {
      throw createHttpError(401, "کاربری یافت نشد.");
    }

    const otp = await OtpCode.findOne({
      where: {
        userId: user?.id,
        code: code,
        expires_in: {
          [Op.gte]: Date.now(),
        },
      },
    });

    if (!otp) {
      throw createHttpError(401, "کد تایید اشتباه است.");
    }

    userId = otp.userId;

    await OtpCode.destroy({
      where: {
        userId,
      },
    });
    const deviceId = crypto.randomUUID();

    const { accessToken, refreshToken } = generateToken({
      user: user.id,
      deviceId,
    });

    const hashedToken = await bcrypt.hash(refreshToken, 10);

    await RefreshTokenUser.create({
      user: user.id,
      deviceId,
      token: hashedToken,
      userAgent: req.headers["user-agent"] || "Unknown",
      ip: req.ip || "Unknown",
    });

    return res.json({
      message: "ورود موفقیت آمیز بود.",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
}

async function verifyRefreshToken(req, res, next) {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) throw createHttpError(401, "لطفا وارد شوید.");

    const { REFRESH_TOKEN_SECRET } = process.env;
    const token = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET);

    if (!token?.user || !token?.deviceId)
      throw createHttpError(401, "توکن نامعتبر است.");

    const user = await UserModel.findByPk(token?.user);
    if (!user) throw createHttpError(401, "لطفا وارد شوید.");

    const existToken = await RefreshTokenUser.findOne({
      where: {
        deviceId: token.deviceId,
        user: user.id,
      },
    });
    if (!existToken) throw createHttpError(401, "نشست منقضی شده است.");

    const isValid = await bcrypt.compare(refresh_token, existToken.token);

    if (!isValid) throw createHttpError(401, "توکن نامعتبر است.");

    const { accessToken, refreshToken } = generateToken({
      user: user.id,
      deviceId: token.deviceId,
    });

    const hashedToken = await bcrypt.hash(refreshToken, 10);

    await existToken.update({
      token: hashedToken,
    });

    return res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log("error", error);

    next(createHttpError(401, "توکن مسدود شد."));
  }
}

function generateToken(payload) {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "20m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return {
    accessToken,
    refreshToken,
  };
}

module.exports = {
  sendOtpHandler,
  checkOtpHandler,
  verifyRefreshToken,
};
