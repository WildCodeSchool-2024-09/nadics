import express from "express";
const router = express.Router();
import path from "node:path";
import authAction from "./modules/auth/authAction";
import commentActions from "./modules/comment/commentActions";
import impacted_personActions from "./modules/request/impacted_personActions";
import impacting_personActions from "./modules/request/impacting_personActions";
import requestActions from "./modules/request/requestActions";
import uploadAction from "./modules/users/uploadAction";
import userActions from "./modules/users/userAction";

router.get("/api/comments/request/:request_id", commentActions.browse);
router.get("/api/comments/:id", commentActions.read);
router.post("/api/comments/", authAction.verifyToken, commentActions.add);
router.put("/api/comments/:id", commentActions.edit);
router.delete("/api/comments/:id", commentActions.destroy);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);

router.post("/api/login/", authAction.login);
router.get("/api/me/", authAction.me);
router.post("/api/logout/", authAction.logout);
router.post("/api/users/", authAction.hashPassword, userActions.add);
router.delete("/api/users/:id", userActions.destroy);
router.put("/api/users/:id", userActions.edit);

router.get("/api/request", requestActions.browse);
router.get("/api/request/:id", requestActions.read);
router.post("/api/request/", authAction.verifyToken, requestActions.add);

router.get(
  "/api/request/:id/isPoster",
  authAction.verifyToken,
  requestActions.isPoster,
  (req, res) => {
    // Si on atteint cette partie, c'est que l'utilisateur est bien le propriétaire.
    res.status(200).json({ message: "You are the owner of this request" });
  },
);
router.put(
  "/api/request/:id",
  authAction.verifyToken,
  requestActions.isPoster,
  requestActions.edit,
);

router.delete(
  "/api/request/:id",
  authAction.verifyToken,
  requestActions.isPoster,
  requestActions.destroy,
);

router.use(
  "/uploads",
  express.static(path.join(__dirname, "public", "uploads")),
);
router.post(
  "/upload-avatar/:id",
  uploadAction.upload.single("avatar"),
  uploadAction.addAvatar,
);

router.get("/api/impacted_person/:requestId", impacted_personActions.read);
router.get("/api/impacting_person/:requestId", impacting_personActions.read);

/*authAction.verifyToken middleware  à ajouter qpres correction

/* ************************************************************************* */
export default router;
