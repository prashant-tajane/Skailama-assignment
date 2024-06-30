import express from "express";
import {
  createProject,
  deleteUploadProjectFile,
  editUploadProjectFile,
  getProject,
  getProjects,
  getUploadProjectFile,
  getUploadProjectFiles,
  uploadProjectFile,
} from "../controllers/projects.controller.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", createProject);

router.post("/uploadProjectFile", uploadProjectFile);
router.get("/uploadProjectFile/:projectId", getUploadProjectFiles);
router.get("/uploadProjectFile/:projectId/:uploadId", getUploadProjectFile)
router.post("/uploadProjectFile/edit", editUploadProjectFile)
router.post("/uploadProjectFile/delete", deleteUploadProjectFile)

export default router;
