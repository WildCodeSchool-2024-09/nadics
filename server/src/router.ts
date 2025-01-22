import express from "express";
const router = express.Router();
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
// Define user-related routes
import requestActions from "./modules/request/requestActions";
import authAction from "./auth/authAction";
import userActions from "./modules/users/userAction";
router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);

router.post("/api/login/", authAction.login);
router.post("/api/users/", authAction.hashPassword, userActions.add);

router.get("/api/request", requestActions.browse);
router.get("/api/request/:id", requestActions.read);
router.put("/api/request/:id", requestActions.edit);

router.post("/api/request/", authAction.verifyToken, requestActions.add);
router.delete("/api/request/:id", requestActions.destroy);
/* ************************************************************************* */
export default router;
