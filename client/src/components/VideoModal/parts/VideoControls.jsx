export default function VideoControls({
  isMuted,
  isPlaying,
  onToggleMute,
  onTogglePlayPause,
}) {
  return (
    <>
      <button
        onClick={onToggleMute}
        className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-xl text-white cursor-pointer"
      >
        <i className={isMuted ? "ri-volume-mute-line" : "ri-volume-up-line"} />
      </button>

      <button
        onClick={onTogglePlayPause}
        className={`absolute left-1/2 top-1/2 z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-3xl text-white cursor-pointer transition-opacity duration-300 ${
          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        <i className={isPlaying ? "ri-pause-fill" : "ri-play-fill"} />
      </button>
    </>
  );
}