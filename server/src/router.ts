import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define user-related routes
import requestActions from "./modules/request/requestActions";

import userActions from "./modules/users/userAction";

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users/", userActions.add);
router.put("/api/users/:id", userActions.edit);

router.get("/api/request", requestActions.browse);
router.get("/api/request/:id", requestActions.read);
router.put("/api/request/:id", requestActions.edit);
router.post("/api/request/", requestActions.add);
router.delete("/api/request/:id", requestActions.destroy);

/* ************************************************************************* */

export default router;
