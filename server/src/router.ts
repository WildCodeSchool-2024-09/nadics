import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import userActions from "./users/userAction";
import requestActions from "./request/requestActions";

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.put("/api/request/:id", requestActions.edit);

/* ************************************************************************* */

export default router;
