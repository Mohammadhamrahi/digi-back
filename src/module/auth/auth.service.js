const createHttpError = require("http-errors");
const { UserModel, OtpCode } = require("../user/user.model");
const { Op } = require("sequelize");
const { sendSms } = require("../sms/veriification");

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

    await sendSms(mobile, code);

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

    return res.json({
      message: "ورود موفقیت آمیز بود.",
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
}

module.exports = {
  sendOtpHandler,
  checkOtpHandler,
};
