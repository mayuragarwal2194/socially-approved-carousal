import { useEffect, useRef, useState } from "react";
import { likeVideo, shareVideo } from "../../api/video.api";
import LoadingOverlay from "./parts/LoadingOverlay";
import VideoControls from "./parts/VideoControls";
import VideoEngagementActions from "./parts/VideoEngagementActions";
import VideoInfo from "./parts/VideoInfo";
import VideoProgress from "./parts/VideoProgress";

export default function ModalVideoCard({ video, isActive, onCardClick }) {
  const videoRef = useRef(null);

  // Video player UI States
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [likesCount, setLikesCount] = useState(video.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [sharesCount, setSharesCount] = useState(video.shares);

  // Sync video playback state when slide becomes active/inactive
  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    // Update progress bar as video plays
    const updateProgress = () => {
      if (!videoElement.duration) return;

      const percentage =
        (videoElement.currentTime / videoElement.duration) * 100;

      setProgress(percentage);
    };

    videoElement.addEventListener("timeupdate", updateProgress);

    videoElement.muted = isMuted;

    if (isActive) {
      videoElement
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    } else {
      videoElement.pause();
      videoElement.currentTime = 0;
      setProgress(0);
      setIsPlaying(false);
      setIsLoading(true);
    }

    // Remove listener to avoid duplicate subscriptions
    return () => {
      videoElement.removeEventListener("timeupdate", updateProgress);
    };
  }, [isActive, isMuted]);

  // Keep actual video element muted state synced with React state
  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    videoElement.muted = isMuted;
  }, [isMuted, isActive]);

  // Toggle playback for active video
  const togglePlayPause = () => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  // like handler
  const handleLike = async (e) => {
    e.stopPropagation();

    const nextLikedState = !isLiked;

    setIsLiked(nextLikedState);
    setLikesCount((prev) => (nextLikedState ? prev + 1 : prev - 1));

    if (!nextLikedState) return;

    try {
      await likeVideo(video.id);
    } catch (error) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
      console.error(error.message);
    }
  };

  // share handler
  const handleShare = async (e) => {
    e.stopPropagation();

    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }

      setSharesCount((prev) => prev + 1);
      await shareVideo(video.id);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      className={`mx-auto w-full max-w-sm transition-all duration-300 ${
        isActive
          ? "relative z-20 scale-100 opacity-100"
          : "relative z-10 scale-70"
      }`}
    >
      <div
        onClick={isActive ? togglePlayPause : onCardClick}
        className="group relative overflow-hidden rounded-3xl bg-zinc-900 cursor-pointer"
      >
        {isActive ? (
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.thumbnailUrl}
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            onWaiting={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            onPlaying={() => setIsLoading(false)}
            onVolumeChange={(e) => {
              setIsMuted(e.currentTarget.muted);
            }}
            className="aspect-[9/16] w-full object-cover"
          />
        ) : (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="aspect-[9/16] w-full object-cover"
          />
        )}

        {/* Loading overlay */}
        {isActive && isLoading && <LoadingOverlay />}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Video Controls */}
        {isActive && (
          <VideoControls
            isMuted={isMuted}
            isPlaying={isPlaying}
            onToggleMute={(e) => {
              e.stopPropagation();
              setIsMuted((prev) => !prev);
            }}
            onTogglePlayPause={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
          />
        )}

        {/* Playback Progress */}
        {isActive && <VideoProgress progress={progress} />}

        {/* Video Engagement actions */}
        {isActive && (
          <VideoEngagementActions
            isLiked={isLiked}
            likesCount={likesCount}
            sharesCount={sharesCount}
            onLike={handleLike}
            onShare={handleShare}
          />
        )}

        <VideoInfo title={video.title} description={video.description} />
      </div>
    </div>
  );
}
