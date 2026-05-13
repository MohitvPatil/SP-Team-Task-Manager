const leaderboard = [
  {
    name: "Mohit",
    score: 96,
  },
  {
    name: "Rahul",
    score: 88,
  },
  {
    name: "Aman",
    score: 80,
  },
];

export default function ProductivityLeaderboard() {
  return (
    <div className="rounded-2xl bg-black p-6 text-white shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Productivity Leaderboard
      </h2>

      <div className="space-y-4">
        {leaderboard.map(
          (member, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl bg-white/10 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                  {index + 1}
                </div>

                <h3 className="font-semibold">
                  {member.name}
                </h3>
              </div>

              <span className="text-lg font-bold">
                {member.score}%
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}