export default function AIInsights() {
  return (
    <div className="rounded-2xl bg-black p-6 text-white shadow">
      <h2 className="text-2xl font-bold">
        AI Productivity Insights
      </h2>

      <div className="mt-6 space-y-4">
        <div className="rounded-xl bg-white/10 p-4">
          Team productivity increased by 14%
          this week.
        </div>

        <div className="rounded-xl bg-white/10 p-4">
          3 overdue tasks require immediate
          attention.
        </div>

        <div className="rounded-xl bg-white/10 p-4">
          Backend team completed sprint goals
          early.
        </div>
      </div>
    </div>
  );
}