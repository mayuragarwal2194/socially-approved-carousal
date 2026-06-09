export default function VideoEngagementActions({
  isLiked,
  likesCount,
  sharesCount,
  onLike,
  onShare,
}) {
  return (
    <div className="action-buttons absolute right-2 bottom-25 md:right-4 md:bottom-16 z-30 flex flex-col items-center gap-[6px] md:gap-y-2">
      {/* Like button */}
      <button
        onClick={onLike}
        className="flex flex-col items-center text-white cursor-pointer"
      >
        <span className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-black/50 text-base md:text-xl">
          <i
            className={isLiked ? "ri-heart-fill text-red-500" : "ri-heart-line"}
          />
        </span>

        <span className="mt-1 text-[10px] md:text-xs font-medium">{likesCount}</span>
      </button>

      {/* Share button */}
      <button
        onClick={onShare}
        className="flex flex-col items-center text-white cursor-pointer"
      >
        <span className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-black/50 text-base md:text-xl">
          <i className="ri-share-forward-line" />
        </span>

        <span className="mt-1 text-[10px] md:text-xs font-medium">{sharesCount}</span>
      </button>
    </div>
  );
}
