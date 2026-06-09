const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchVideos = async () => {
  const response = await fetch(`${API_BASE_URL}/videos`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch videos");
  }

  return data;
};

export const likeVideo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/videos/${id}/like`, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to like video");
  }

  return data;
};

export const shareVideo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/videos/${id}/share`, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to share video");
  }

  return data;
};