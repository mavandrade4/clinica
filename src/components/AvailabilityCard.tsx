import type {
  Assignment,
  Building,
  ServiceType,
} from "../types/models";
import {
  getStatus,
  getTodaySchedule,
} from "../utils/availability";

interface Props {
  assignment: Assignment;
  building: Building;
  type: ServiceType;
}

export default function AvailabilityCard({
  assignment,
  building,
  type,
}: Props) {
  const status = getStatus(assignment);

  const statusColor = {
    OPEN: "#22c55e",
    CLOSING_SOON: "#f59e0b",
    CLOSED: "#ef4444",
  }[status];

  const statusText = {
    OPEN: "Open",
    CLOSING_SOON: "Closing Soon",
    CLOSED: "Closed",
  }[status];

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "2vh",
        }}
      >
        <h3>{type.name}</h3>

        <span
          style={{
            background: statusColor,
            color: "white",
            padding: "4px 10px",
            borderRadius: "999px",
            fontWeight: "bold",
            fontSize: "0.9rem",
          }}
        >
          {statusText}
        </span>
      </div>

      <hr />

<br/>
      <p>
        <strong>🏢</strong> {building.name}
      </p>

      <p>
        <strong>🕒</strong> {getTodaySchedule(assignment)}
      </p>

      {assignment.notes && (
        <p>
          <strong>📝</strong> {assignment.notes}
        </p>
      )}
    </div>
  );
}