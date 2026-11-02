import express, { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { productSchemas } from "../validation/productValidation";
import * as productController from "../controllers/productController";

const router: Router = express.Router();

// "/api/v1/items" prefixes all below routes
router.get("/", productController.getAllProducts);
router.post(
    "/",
    validateRequest(productSchemas.create),
    productController.createProduct
);
router.put(
    "/:id",
    validateRequest(productSchemas.update),
    productController.updateItem
);
router.delete("/:id", productController.deleteProduct);

export default router;