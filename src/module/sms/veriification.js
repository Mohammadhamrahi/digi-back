const qs = require("qs");
const { default: axios } = require("axios");
const { config } = require("dotenv");
config;

async function sendSms(mobile, code) {
  try {
    const data = {
      RecNumber: mobile,
      AccessHash: "ac9a9712-567c-4bd9-8244-1da4af0b01ae",
      PhoneNumber: "9830008632100000",
      PatternId: "6dbc267d-841d-416f-b8ea-3080388cb83f",
      Smsclass: 1,
      token1: code,
    };

    const token = Buffer.from(
      `${process.env.USERNAME_SMS}:${process.env.PASS_SMS}`
    ).toString("base64");

    await axios.post(
      "https://smspanel.trez.ir/SendPatternWithPost.ashx",
      qs.stringify(data),
      {
        headers: {
          Authorization: `Basic ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  sendSms,
};
