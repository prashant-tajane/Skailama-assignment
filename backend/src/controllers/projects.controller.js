import Project, { uploadProjectFileSchema } from "../models/project.model.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createProject = async (req, res, next) => {
  try {
    const { projectName } = req.body;
    const existingProject = await Project.findOne({ projectName });
    if (existingProject) {
      return next(new ErrorHandler(400, "Project already exists"));
    }

    const project = await Project.create({ projectName });
    res.status(201).json(project);
    res.send();
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

export const getProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      return next(new ErrorHandler(404, "Project not found"));
    }
    res.status(200).json(project);
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

export const uploadProjectFile = async (req, res, next) => {
  try {
    const { projectId, name, description, uploadFileName } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return next(new ErrorHandler(404, "Project not found"));
    }

    project.uploads.push({ name, description, uploadFileName });
    await project.save();

    const data = project.uploads[project.uploads.length - 1];
    res.status(201).json(data);
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

export const getUploadProjectFiles = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      return next(new ErrorHandler(404, "Project not found"));
    }
    res.status(200).json(project.uploads);
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

export const getUploadProjectFile = async (req, res, next) => {
  try {
    const { projectId, uploadId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      return next(new ErrorHandler(404, "Project not found"));
    }

    const upload = project.uploads.find(
      (upload) => upload._id.toString() === uploadId
    );
    if (!upload) {
      return next(new ErrorHandler(404, "Upload not found"));
    }
    res.status(200).json(upload);
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

export const editUploadProjectFile = async (req, res, next) => {
  try {
    const { description, projectId, uploadId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return next(new ErrorHandler(404, "Project not found"));
    }

    const uploadIndex = project.uploads.findIndex(
      (upload) => upload._id.toString() === uploadId
    );
    if (uploadIndex === -1) {
      return next(new ErrorHandler(404, "Upload not found"));
    }

    project.uploads[uploadIndex].description = description;
    project.createdAt = Date.now();
    await project.save();

    res.status(200).json(project.uploads[uploadIndex]);
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

export const deleteUploadProjectFile = async (req, res, next) => {
  try {
    const { projectId, uploadId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return next(new ErrorHandler(404, "Project not found"));
    }

    const uploadIndex = project.uploads.findIndex(
      (upload) => upload._id.toString() === uploadId
    );
    if (uploadIndex === -1) {
      return next(new ErrorHandler(404, "Upload not found"));
    }

    project.uploads.splice(uploadIndex, 1);
    await project.save();

    res.status(200).json({ message: "Upload deleted successfully" });
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};
