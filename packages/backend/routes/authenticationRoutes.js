import { Router } from "express";
import tokenVerification from "../security/authentication.js";
import login from "../controllers/authentication/login.js";
import loadProfile from "../controllers/access/controls/loadProfile.js";
import logout from "../controllers/authentication/logout.js";
import register from "../controllers/authentication/register.js";
import delUser from "../controllers/features/users/deleteUser.js";
import allUser from "../controllers/features/users/allUser.js";
import addUser from "../controllers/features/users/addUser.js";

const authRoute = Router();

authRoute.post("/register", (req, res) => register(req, res));
authRoute.post("/login", (req, res) => login(req, res));
authRoute.post("/logout", (req, res) => logout(req, res));
authRoute.delete("/user/delete", tokenVerification, (req, res) => delUser(req, res));
authRoute.post("/user/add",tokenVerification, (req, res) => addUser(req, res));


authRoute.get("/users", tokenVerification, (req, res) => loadProfile(req, res));
authRoute.get("/users/all", tokenVerification, (req, res) => allUser(req, res));


export default authRoute;
