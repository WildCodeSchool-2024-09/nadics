import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import userActions from "./users/userAction";

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);

/* ************************************************************************* */

export default router;
