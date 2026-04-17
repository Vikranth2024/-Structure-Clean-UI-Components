// src/components/shared/TaskItem.jsx
// Responsible for: Rendering a single task row with toggle, priority badge, tag badge, and delete
// Reused by: TaskList (rendered once per task in the filtered list)

const PRIORITY_STYLES = {
  high: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
  medium: { bg: "rgba(245,158,11,0.15)", color: "#fbbf24" },
  low: { bg: "rgba(34,197,94,0.15)", color: "#4ade80" },
};

export default function TaskItem({ task, onToggle, onDelete }) {
  const priorityStyle = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium;

  return (
    <div
      style={{
        background: "#1a1a2e",
        border: `1px solid ${task.completed ? "#1e3a2e" : "#2d2d44"}`,
        borderRadius: 12,
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        transition: "border-color 0.2s",
        opacity: task.completed ? 0.6 : 1,
      }}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          border: `2px solid ${task.completed ? "#22c55e" : "#4b5563"}`,
          background: task.completed ? "#22c55e" : "transparent",
          cursor: "pointer",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 12,
        }}
      >
        {task.completed ? "Γ£ô" : ""}
      </button>

      {/* Task info */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: task.completed ? "#64748b" : "#e2e8f0",
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <span
            style={{
              fontSize: 11,
              padding: "2px 8px",
              borderRadius: 99,
              background: priorityStyle.bg,
              color: priorityStyle.color,
            }}
          >
            {task.priority}
          </span>
          <span
            style={{
              fontSize: 11,
              padding: "2px 8px",
              borderRadius: 99,
              background: "rgba(99,102,241,0.12)",
              color: "#a78bfa",
            }}
          >
            {task.tag}
          </span>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(task.id)}
        style={{
          background: "transparent",
          border: "none",
          color: "#475569",
          cursor: "pointer",
          fontSize: 16,
          padding: "4px 8px",
          borderRadius: 6,
        }}
      >
        Γ£ò
      </button>
    </div>
  );
}
