import { Schema, model } from "mongoose";

export const uploadProjectFileSchema = new Schema(
  {
    name: String,
    description: String,
    status: {
      type: String,
      default: "pending",
    },
    uploadFileName: String,
  },
  {
    timestamps: true,
  }
);
const projectSchema = new Schema(
  {
    projectName: String,
    uploads: [uploadProjectFileSchema],
    widgets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Widget",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);

export default Project;
