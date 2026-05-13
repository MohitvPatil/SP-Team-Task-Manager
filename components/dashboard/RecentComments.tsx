const comments = [
  {
    user: "Rahul",
    message:
      "Backend API is ready for testing.",
  },
  {
    user: "Aman",
    message:
      "UI improvements pushed successfully.",
  },
];

export default function RecentComments() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Recent Comments
      </h2>

      <div className="space-y-4">
        {comments.map(
          (comment, index) => (
            <div
              key={index}
              className="rounded-xl border p-4"
            >
              <h3 className="font-semibold">
                {comment.user}
              </h3>

              <p className="mt-2 text-gray-500">
                {comment.message}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}