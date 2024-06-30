import { Schema, model } from "mongoose";

const widgetSchema = new Schema(
  {
    chatbotName: String,
    welcomeMessage: String,
    inputPlaceholder: String,
    primaryColor: String,
    fontColor: String,
    fontSize: String,
    chatHeight: String,
    showSources: Boolean,
    distanceFromBottom: String,
    horizontalDistance: String,
    chatIconSize: String,
    positionOnScreen: String,
    botIconImage: String,
  },
  {
    timestamps: true,
  }
);


const Widget = model("Widget", widgetSchema);

export default Widget;