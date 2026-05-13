"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "High",
    value: 10,
  },
  {
    name: "Medium",
    value: 18,
  },
  {
    name: "Low",
    value: 28,
  },
];

const COLORS = [
  "#ef4444",
  "#f59e0b",
  "#22c55e",
];

export default function TaskPriorityChart() {
  return (
    <div className="h-[350px] rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Task Priority
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}