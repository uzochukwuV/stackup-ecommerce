import { Router } from "express";
import createProduct from "../controllers/features/products/createProduct.js";
import allProducts from "../controllers/features/products/allProducts.js";
import tokenVerification from "../security/authentication.js";
import queryProducts from "../controllers/features/products/queryProducts.js";

const productsRoutes = Router({ mergeParams: true });

productsRoutes.post("/create", tokenVerification, (req, res) =>
	createProduct(req, res),
);
// productsRoutes.delete("/post/delete", tokenVerification, (req, res) =>
// 	deletePost(req, res),
// );
// productsRoutes.put("/post/update", tokenVerification, (req, res) =>
// 	updatePost(req, res),
// );

// // no auth needed routes
// productsRoutes.get("/user/:username", (req, res) =>
// 	loadUserPosts(req, res),
// );
productsRoutes.get("/all", (req, res) => allProducts(req, res));
productsRoutes.post("/query", (req, res) =>
	queryProducts(req, res),
);

export default productsRoutes;
