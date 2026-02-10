const { default: axios } = require("axios");
const { config } = require("dotenv");
const createHttpError = require("http-errors");
config();
async function ZarinpalRequest(amount, user, description) {
  const result = await axios
    .post(
      process.env.ZARINPAL_REQUEST_URL,
      {
        merchant_id: process.env.MERCHANT_ID,
        callback_url: process.env.CALLBACK_URL,
        amount,
        description: description + user?.mobile,
        metadata: {
          email: user?.email ? user?.email : "",
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
      console.log(err);

      return err;
    });

  if (result?.data?.data?.authority) {
    return {
      authority: result?.data?.data?.authority,
      payment_url: `${process.env.ZARINPAL_GATEWAY_URL}/${result?.data?.data?.authority}`,
    };
  }
}

async function ZarinpalVerify(amount, authority) {
  const result = await axios
    .post(
      process.env.ZARINPAL_VERIFY_URL,
      {
        amount,
        merchant_id: process.env.MERCHANT_ID,
        authority,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
  return result?.data ?? {};
  if (result?.data?.data?.code == 100) {
    return result.data;
  } else if (result?.data?.data?.code == 101) {
    throw createHttpError(400, "already paymnet verify");
  }
  throw createHttpError(500, "some thing is wrong");
}
module.exports = {
  ZarinpalRequest,
  ZarinpalVerify,
};
