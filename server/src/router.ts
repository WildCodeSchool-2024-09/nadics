import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import requestActions from "./modules/request/requestActions";

import userActions from "./users/userAction";

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);

router.get("/api/request", requestActions.browse);
router.get("/api/request/:id", requestActions.read);
router.put("/api/request/:id", requestActions.edit);

/* ************************************************************************* */

export default router;
