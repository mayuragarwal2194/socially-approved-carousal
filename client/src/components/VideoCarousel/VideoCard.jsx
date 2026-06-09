import { useEffect, useRef } from "react";


export default function VideoCard({ video, onClick }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElement.play().catch(() => {});
        }else{
          videoElement.pause();
        }
      },
      {threshold: 0.6}
    );

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    }

  }, []);

  return (
    <button onClick={onClick} className="group w-full text-left cursor-pointer">
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-zinc-900">
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-sm font-semibold line-clamp-2">
            {video.title}
          </h3>

          <p className="mt-1 text-xs text-gray-300">
            ❤️ {video.likes} · ↗ {video.shares}
          </p>
        </div>
      </div>
    </button>
  );
}