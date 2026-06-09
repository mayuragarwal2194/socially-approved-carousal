export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
    </div>
  );
}