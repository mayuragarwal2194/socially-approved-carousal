export default function VideoProgress({ progress }) {
  return (
    <div className="absolute bottom-0 left-0 z-30 h-1 w-full bg-white/20">
      <div
        className="h-full bg-white transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}