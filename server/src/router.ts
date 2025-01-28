import express from "express";
const router = express.Router();
import path from "node:path";
import multer from "multer";
import authAction from "./auth/authAction";
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
router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);

router.post("/api/login/", authAction.login);
router.post("/api/users/", authAction.hashPassword, userActions.add);

router.post("/upload-avatar/:id", upload.single("avatar"), uploads.addAvatar);

router.get("/api/request", requestActions.browse);
router.get("/api/request/:id", requestActions.read);
router.put("/api/request/:id", requestActions.edit);

router.post("/api/request/", authAction.verifyToken, requestActions.add);
router.delete("/api/request/:id", requestActions.destroy);
/* ************************************************************************* */
export default router;
