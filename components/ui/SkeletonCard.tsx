export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-6 shadow">
      <div className="h-6 w-1/2 rounded bg-gray-200" />

      <div className="mt-6 h-4 w-full rounded bg-gray-200" />

      <div className="mt-3 h-4 w-2/3 rounded bg-gray-200" />
    </div>
  );
} 