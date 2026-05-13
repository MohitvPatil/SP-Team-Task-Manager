interface ErrorStateProps {
  title: string;
}

export default function ErrorState({
  title,
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
      <h2 className="text-2xl font-bold text-red-600">
        {title}
      </h2>

      <p className="mt-3 text-gray-500">
        Something went wrong.
      </p>
    </div>
  );
}