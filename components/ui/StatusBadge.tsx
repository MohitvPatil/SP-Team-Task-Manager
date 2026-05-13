interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const getColor = () => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600";

      case "In Progress":
        return "bg-yellow-100 text-yellow-600";

      default:
        return "bg-red-100 text-red-600";
    }
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${getColor()}`}
    >
      {status}
    </span>
  );
}