import express from "express";
import { getVideos, likeVideo, shareVideo } from "../controllers/video.controllers.js";

const router = express.Router();

router.get("/", getVideos);
router.post("/:id/like", likeVideo);
router.post("/:id/share", shareVideo);

export default router;