const { Router } = require("express");
const { AuthGurd } = require("../auth/auth.gurd");
const {
  createtRoleHandler,
  createtPermissionHandler,
  assignPermissionToRole,
} = require("./rabc.service");
const { assignPermissionToRoleValidation } = require("./validation");

const router = Router();

router.post("/create-role", AuthGurd, createtRoleHandler);
router.post("/create-permission", AuthGurd, createtPermissionHandler);
router.post(
  "/add-permission-to-role",
  AuthGurd,
  assignPermissionToRoleValidation,
  assignPermissionToRole
);

module.exports = {
  RabcRouter: router,
};
