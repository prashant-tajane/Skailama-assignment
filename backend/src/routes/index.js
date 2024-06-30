import express from "express";
import userRoutes from "./user.routes.js";
import projectRoutes from "./projects.routes.js";
import widgetRoutes from "./widget.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/widgets", widgetRoutes);

export default router;
