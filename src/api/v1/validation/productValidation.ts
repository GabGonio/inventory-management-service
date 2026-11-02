import Joi, { required } from "joi";
import { RequestSchema } from "../middleware/productValidate";

/**
 * Item schema organised by request type
 */
export const productSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/items - Create new Item
    create: {
        body: Joi.object({
            name: Joi.string().min(2).max(80).required().messages({
                "any.required": "Name is required",
                "string.min": "Name must have a minimum of 2 characters",
                "string.max": "Name cannot go past maximum of 80 characters",
                "string.empty": "Name cannot be empty",
            }),
            price: Joi.number().positive().precision(2).prefs({ convert: false}).required().messages({
                "number.positive": "Price must be positive",
                "number.precision": "Price must not go over 2 decimals"
            }),
            sku: Joi.string().pattern(/^[A-Z]{3}\d{4}$/).required().messages({
                "any.required": "sku is required",
                "string.empty": "sku cannot be empty",
                "string.pattern.base": "sku must contain exactly 3 uppercase letters followed by 4 digits.",
            }),
            category: Joi.string().valid("electronics", "clothing", "food", "tools", "other").required().messages({
                "any.required": "category is required",
                "any.only": "category needs to be one of: electronics, clothing, food, tools, other",
                "string.empty": "category cannot be empty",
            }),
            quantity: Joi.number().integer().min(0).required().messages({
                "any.required": "Quantity is missing",
                "number.base": "Quantity isn't a valid number",
                "number.integer": "Quantity isn't a whole number",
                "number.min": "Quantity is below the allowed minimum"
            })
        }),
    },

    // PUT /api/v1/items/:id - Update Product
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Product ID is required",
                "string.empty": "Product ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().min(2).max(80).optional().messages({
                "string.empty": "Name cannot be empty",
                "string.min": "Name must be 2 characters or more",
                "string.max": "Name cannot go over 80 characters",
            }),
            quantity: Joi.number().integer().min(0).optional().messages({
                "number.base": "Quantity isn't a valid number",
                "number.integer": "Quantity isn't a whole number",
                "number.min": "Quantity is below the allowed minimum"
            }),
            price: Joi.number().positive().precision(2).prefs({ convert: false}).optional().messages({
                "number.positive": "Price must be positive",
                "number.precision": "Price must not go over 2 decimals"
            }),
            category: Joi.string().valid("electronics", "clothing", "food", "tools", "other").optional().messages({
                "any.only": "category needs to be one of: electronics, clothing, food, tools, other",
                "string.empty": "category cannot be empty",
            }),
        }),
    },
};
