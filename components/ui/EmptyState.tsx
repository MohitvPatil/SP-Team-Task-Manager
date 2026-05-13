interface EmptyStateProps {
  title: string;
}

export default function EmptyState({
  title,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed bg-white p-10 text-center">
      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-3 text-gray-500">
        No data available yet.
      </p>
    </div>
  );
}