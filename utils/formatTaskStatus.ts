export const formatTaskStatus = (
  status: string
) => {
  return status
    .replace("_", " ")
    .toLowerCase();
};