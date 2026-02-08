const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../user/user.model");

async function AuthGurd(req, res, next) {
  try {
    const authorization = req?.headers?.authorization;

    if (!authorization) throw createHttpError(401, "1لطفا وارد شوید");
    const [bearer, token] = authorization.split(" ");
    if (!bearer || bearer.toLowerCase() != "bearer")
      throw createHttpError(401, "لطفا وارد شوید2");
    const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (verify?.user) {
      const user = await UserModel.findByPk(verify.user);
      if (!user) throw createHttpError(401, "لطفا وارد شوید");
      req.user = {
        id: user.id,
        mobile: user.mobile,
      };
      return next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  AuthGurd,
};
