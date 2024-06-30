import ErrorHandler from "../utils/errorHandler.js";
import { generateUploadURL } from "../config/aws.js";
import Project from "../models/project.model.js";
import Widget from "../models/widget.model.js";


// Upload image and generate upload URL
export const getGenerateUploadURL = async (req, res, next) => {
  try {
    const uploadURL = await generateUploadURL(req.file);
    res.status(200).json({ uploadURL });
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};

export const addWidget = async (req, res, next) => {
  try {
    const { projectId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return next(new ErrorHandler(404, "Project not found"));
    }

    const widget = await Widget.create(req.body);
    project.widgets.push(widget._id);
    await project.save();
    res.status(201).json(widget)
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
}
