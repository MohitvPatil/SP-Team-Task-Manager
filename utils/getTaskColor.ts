export const getTaskColor = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return "bg-red-500";

    case "MEDIUM":
      return "bg-yellow-500";

    case "LOW":
      return "bg-green-500";

    default:
      return "bg-gray-500";
  }
};