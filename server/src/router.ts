import express from "express";
const router = express.Router();
import path from "node:path";
import multer from "multer";
import authAction from "./auth/authAction";
import commentActions from "./modules/comment/commentActions";
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
// Define user-related routes
import requestActions from "./modules/request/requestActions";
import uploads from "./modules/users/uploadsAction";
import userActions from "./modules/users/userAction";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/api/comments", commentActions.browse);
router.get("/api/comments/request/:request_id", commentActions.browseRequest);
router.get("/api/comments/:id", commentActions.read);
router.post("/api/comments/", commentActions.add);
router.put("/api/comments/:id", commentActions.edit);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);

router.post("/api/login/", authAction.login);
router.post("/api/users/", authAction.hashPassword, userActions.add);
router.delete("/api/users/:id", userActions.destroy);

router.post("/upload-avatar/:id", upload.single("avatar"), uploads.addAvatar);

router.get("/api/request", requestActions.browse);
router.get("/api/request/user/:user_id", requestActions.browseUser);
router.get("/api/request/:id", requestActions.read);
router.put("/api/request/:id", requestActions.edit);

router.post("/api/request/", requestActions.add);
router.delete("/api/request/:id", requestActions.destroy);

/*authAction.verifyToken middleware  à ajouter qpres correction

/* ************************************************************************* */
export default router;
