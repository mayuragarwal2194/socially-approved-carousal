import { videos } from "../data/videos.js";

export const getVideos = (req, res) => {
  res.status(200).json({
    success: true,
    count: videos.length,
    data: videos,
  });
};

export const likeVideo = (req, res) => {
  const { id } = req.params;

  const video = videos.find((video) => video.id === id);

  if (!video) {
    return res.status(404).json({
      success: false,
      message: "Video not found",
    });
  }

  video.likes += 1;

  res.status(200).json({
    success: true,
    message: "Video liked successfully",
    data: video,
  });
};

export const shareVideo = (req, res) => {
  const { id } = req.params;
  const { platform = "copy-link" } = req.body || {};

  const video = videos.find((video) => video.id === id);

  if (!video) {
    return res.status(404).json({
      success: false,
      message: "Video not found",
    });
  }

  video.shares += 1;

  res.status(200).json({
    success: true,
    message: "Video shared successfully",
    platform,
    data: video,
  });
};