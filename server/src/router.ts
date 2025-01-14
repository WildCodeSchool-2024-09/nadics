import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define user-related routes
import requestActions from "./modules/request/requestActions";

import userActions from "./users/userAction";

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users/", userActions.add);

router.get("/api/request", requestActions.browse);
router.put("/api/request/:id", requestActions.edit);

/* ************************************************************************* */

export default router;
