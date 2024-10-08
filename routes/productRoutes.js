import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

import {isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';

const router = express.Router()
router.post("/create-product" , requireSignIn , isAdmin , formidable(),createProductController)
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
)
//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);
//get photo
router.get("/product-photo/:pid", productPhotoController);
router.delete("/product/:pid", deleteProductController);

export default router;