import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors"
import errorHandler from "./middlewares/error.js";
import apiRoutes from "./routes/index.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV !== 'production') {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Skilama Api",
  });
});

app.use("/api/v1", apiRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Route not found",
  });
});


app.use(errorHandler);



export default app;

//https://dummyjson.com/users
