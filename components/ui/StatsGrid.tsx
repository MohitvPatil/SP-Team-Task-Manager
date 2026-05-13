import StatsCard from "@/components/dashboard/StatsCard";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Projects"
        value={12}
      />

      <StatsCard
        title="Completed Tasks"
        value={84}
      />

      <StatsCard
        title="Pending Tasks"
        value={16}
      />

      <StatsCard
        title="Team Members"
        value={28}
      />
    </div>
  );
}