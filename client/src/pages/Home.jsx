import { useEffect, useState } from "react";
import { fetchVideos } from "../api/video.api";
import VideoCarousel from "../components/VideoCarousel/VideoCarousel";
import VideoModal from "../components/VideoModal/VideoModal";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

  // Fetch videos once when the home page loads
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const result = await fetchVideos();
        setVideos(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const closeModal = () => {
    setSelectedVideoIndex(null);
  };

  if (loading) return <p className="text-white">Loading videos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 sm:px-8 lg:px-20">
      <h1 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
        Socially Approved
      </h1>

      <VideoCarousel videos={videos} onVideoClick={setSelectedVideoIndex} />

      {/* Show modal only when a video is selected */}
      {selectedVideoIndex !== null && (
        <VideoModal
          videos={videos}
          selectedVideoIndex={selectedVideoIndex}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
