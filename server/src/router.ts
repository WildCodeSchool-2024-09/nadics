import express from "express";
const router = express.Router();
import authAction from "./auth/authAction";
import commentActions from "./modules/comment/commentActions";
import requestActions from "./modules/request/requestActions";
import userActions from "./modules/users/userAction";

router.post("/api/login/", authAction.login);

router.get("/api/comments", commentActions.browse);
router.get("/api/comments/:id", commentActions.read);
router.post("/api/comments/", commentActions.add);
router.delete("/api/comments/:id", commentActions.destroy);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users/", authAction.hashPassword, userActions.add);

router.get("/api/request", requestActions.browse);
router.get("/api/request/:id", requestActions.read);
router.put("/api/request/:id", requestActions.edit);

router.post("/api/request/", authAction.verifyToken, requestActions.add);
router.delete("/api/request/:id", requestActions.destroy);
/* ************************************************************************* */
export default router;
