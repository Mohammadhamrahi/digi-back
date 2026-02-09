const { default: axios } = require("axios");
const { config } = require("dotenv");
config();
async function ZarinpalRequest(amount, user, description = "خرید محصول") {
  const result = await axios
    .post(
      process.env.ZARINPAL_REQUEST_URL,
      {
        merchant_id: process.env.MERCHANT_ID,
        callback_url: process.env.CALLBACK_URL,
        amount,
        description,
        metadata: {
          email: "example@gmail.com",
          mobile: user?.mobile,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((err) => {
      return err;
    });

  if (result?.data?.data?.authority) {
    return {
      authority: result?.data?.data?.authority,
      payment_url: `${process.env.ZARINPAL_GATEWAY_URL}/${result?.data?.data?.authority}`,
    };
  }
}

module.exports = {
  ZarinpalRequest,
};
