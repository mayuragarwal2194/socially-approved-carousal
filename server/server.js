import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;
dotenv.config();

// Import Routes
import videoRoutes from "./routes/video.routes.js";




const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route to verify if api is live
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Socially Approved Carousel API is running",
  });
});

app.use("/api/v1/videos", videoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});