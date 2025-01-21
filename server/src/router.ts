import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define user-related routes
import requestActions from "./modules/request/requestActions";

import authActions from "./modules/auth/authActions";
import userActions from "./users/userAction";

router.post("/api/login", authActions.login);

router.post("/api/users", authActions.hashPassword, userActions.add);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users/", userActions.add);

router.get("/api/request", requestActions.browse);
router.get("/api/request/:id", requestActions.read);
router.put("/api/request/:id", requestActions.edit);
router.post("/api/request/", requestActions.add);

/* ************************************************************************* */

export default router;
