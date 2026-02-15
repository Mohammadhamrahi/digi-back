const createHttpError = require("http-errors");
const { Role, Permission, RolePermission } = require("./rbac.model");
const { Op } = require("sequelize");

async function createtRoleHandler(req, res, next) {
  try {
    const { title, description } = req.body;
    const role = await Role.findOne({ where: { title } });
    if (role) throw createHttpError(409, "tole has already exisit");
    await Role.create({
      title,
      description,
    });

    return res.json({
      message: "role created",
    });
  } catch (error) {
    next(error);
  }
}
async function createtPermissionHandler(req, res, next) {
  try {
    const { title, description } = req.body;
    const role = await Permission.findOne({ where: { title } });
    if (role) throw createHttpError(409, "Permission has already exisit");
    await Permission.create({
      title,
      description,
    });

    return res.json({
      message: "Permission created",
    });
  } catch (error) {
    next(error);
  }
}

async function assignPermissionToRole(req, res, next) {
  try {
    const { roleId, permissions = [] } = req.body;
    const role = await Role.findOne({ where: { id: roleId } });
    if (!role) throw createHttpError(400, "role not found");
    if (permissions?.length > 0) {
      const permissionCount = await Permission.count({
        where: { id: { [Op.in]: permissions } },
      });
      if (permissionCount !== permissions.length) {
        throw createHttpError(400, "send correct list og permissions");
      }
      const permissionList = permissions?.map((per) => ({
        roleId,
        permissionId: per,
      }));
      await RolePermission.bulkCreate(permissionList);
    }
    return res.json({ message: "assigned permission to role" });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createtRoleHandler,
  createtPermissionHandler,
  assignPermissionToRole,
};
