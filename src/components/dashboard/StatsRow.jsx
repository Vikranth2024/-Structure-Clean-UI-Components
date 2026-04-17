// src/components/dashboard/StatsRow.jsx
// Responsible for: Displaying the 4 summary stat cards in a grid
// Uses: StatCard (shared/reusable)

import StatCard from "../shared/StatCard";

export default function StatsRow({ total, completed, remaining, progressPercent }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
        marginBottom: 32,
      }}
    >
      <StatCard label="Total Tasks" value={total} subtext="All time" />
      <StatCard label="Completed" value={completed} valueColor="#22c55e" subtext="Done Γ£ô" />
      <StatCard label="Remaining" value={remaining} valueColor="#f59e0b" subtext="To do" />
      <StatCard
        label="Progress"
        value={`${progressPercent}%`}
        valueColor="#6366f1"
        subtext=""
        showProgress
        progressPercent={progressPercent}
      />
    </div>
  );
}
