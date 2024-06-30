import express from "express";
import { addWidget, getGenerateUploadURL } from "../controllers/widget.controller.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/get-upload-url", upload.single("image"), getGenerateUploadURL);

router.post("/", addWidget)

export default router;
