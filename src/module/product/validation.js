const { validate, Joi } = require("express-validation");
const { ProductType } = require("../../common/constant/product.const");

const createProductValidation = validate({
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string()
      .valid(...Object.values(ProductType))
      .required(),
    price: Joi.number().optional().allow(null),
    discount: Joi.number().optional().allow(null),
    active_discount: Joi.boolean().optional().allow(null),
    count: Joi.number().optional().allow(null),
    details: Joi.array()
      .items(
        Joi.object({
          key: Joi.string().required(),
          value: Joi.string().required(),
        })
      )
      .optional(),
    colors: Joi.array()
      .items(
        Joi.object({
          colorName: Joi.string().required(),
          colorCode: Joi.string().required(),
          count: Joi.string().required(),
          price: Joi.string().optional().allow(null),
          discount: Joi.string().optional().allow(null),
          active_discount: Joi.string().optional().allow(null),
        })
      )
      .optional(),
    sizes: Joi.array()
      .items(
        Joi.object({
          size: Joi.string().required(),
          count: Joi.string().required(),
          price: Joi.string().optional().allow(null),
          discount: Joi.string().optional().allow(null),
          active_discount: Joi.string().optional().allow(null),
        })
      )
      .optional(),
  }),
});

module.exports = {
  createProductValidation,
};
