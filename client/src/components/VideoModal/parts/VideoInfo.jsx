export default function VideoInfo({ title, description }) {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="mt-2 text-sm text-gray-300 line-clamp-2">
        {description}
      </p>
    </div>
  );
}