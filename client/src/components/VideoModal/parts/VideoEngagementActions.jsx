export default function VideoEngagementActions({
  isLiked,
  likesCount,
  sharesCount,
  onLike,
  onShare,
}) {
  return (
    <div className="action-buttons absolute right-4 bottom-16 z-30 flex flex-col items-center gap-y-2">
      {/* Like button */}
      <button
        onClick={onLike}
        className="flex flex-col items-center text-white cursor-pointer"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-xl">
          <i
            className={isLiked ? "ri-heart-fill text-red-500" : "ri-heart-line"}
          />
        </span>

        <span className="mt-1 text-xs font-medium">{likesCount}</span>
      </button>

      {/* Share button */}
      <button
        onClick={onShare}
        className="flex flex-col items-center text-white cursor-pointer"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-xl">
          <i className="ri-share-forward-line" />
        </span>

        <span className="mt-1 text-xs font-medium">{sharesCount}</span>
      </button>
    </div>
  );
}
