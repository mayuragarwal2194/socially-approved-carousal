// Backend API URL configured through Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Shared request helper to avoid repeating fetch/error-handling logic
const request = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    const data = await response.json();

    // Convert API errors into JavaScript errors
    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  } catch (error) {
    // Handle network failures and unexpected request errors
    throw new Error(error.message || "Network error");
  }
};

// Fetch all videos for the carousel
export const fetchVideos = () => {
  return request(`${API_BASE_URL}/videos`);
};

// Increment like count for a video
export const likeVideo = (id) => {
  return request(`${API_BASE_URL}/videos/${id}/like`, {
    method: "POST",
  });
};

// Increment share count for a video
export const shareVideo = (id) => {
  return request(`${API_BASE_URL}/videos/${id}/share`, {
    method: "POST",
  });
};