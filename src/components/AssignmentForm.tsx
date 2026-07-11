import { useEffect, useState } from "react";
import type {
  Assignment,
  Building,
  ServiceType,
  Schedule,
} from "../types/models";

interface Props {
  buildings: Building[];
  types: ServiceType[];

  initialValue?: Assignment;

  onSave: (assignment: Assignment) => void;
  onCancel?: () => void;
}

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export default function AssignmentForm({
  buildings,
  types,
  initialValue,
  onSave,
  onCancel,
}: Props) {
  const [buildingId, setBuildingId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [notes, setNotes] = useState("");

  const [schedule, setSchedule] = useState<Schedule>({});

  useEffect(() => {
    if (initialValue) {
      setBuildingId(initialValue.buildingId);
      setTypeId(initialValue.typeId);
      setNotes(initialValue.notes);
      setSchedule(initialValue.schedule);
    }
  }, [initialValue]);

  function updateSchedule(
    day: keyof Schedule,
    field: "open" | "close",
    value: string
  ) {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        open: prev[day]?.open ?? "",
        close: prev[day]?.close ?? "",
        [field]: value,
      },
    }));
  }

  function toggleClosed(day: keyof Schedule, closed: boolean) {
    if (closed) {
      setSchedule((prev) => {
        const copy = { ...prev };
        delete copy[day];
        return copy;
      });
    } else {
      setSchedule((prev) => ({
        ...prev,
        [day]: {
          open: "09:00",
          close: "17:00",
        },
      }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!buildingId || !typeId) {
      alert("Please select both a building and a type.");
      return;
    }

    onSave({
      id: initialValue?.id ?? crypto.randomUUID(),
      buildingId,
      typeId,
      schedule,
      notes,
    });

    if (!initialValue) {
      setBuildingId("");
      setTypeId("");
      setNotes("");
      setSchedule({});
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>
        {initialValue ? "Edit Assignment" : "New Assignment"}
      </h2>

      <label>Building</label>

      <select
        value={buildingId}
        onChange={(e) => setBuildingId(e.target.value)}
      >
        <option value="">Select...</option>

        {buildings.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <label>Type</label>

      <select
        value={typeId}
        onChange={(e) => setTypeId(e.target.value)}
      >
        <option value="">Select...</option>

        {types.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <h3>Weekly Schedule</h3>

      {days.map((day) => {
        const current = schedule[day];

        return (
          <div className="row">
            <strong style={{ textTransform: "capitalize" }}>
              {day}
            </strong>

            {current ? (
              <>
                <input
                  type="time"
                  value={current.open}
                  onChange={(e) =>
                    updateSchedule(day, "open", e.target.value)
                  }
                />

                <input
                  type="time"
                  value={current.close}
                  onChange={(e) =>
                    updateSchedule(day, "close", e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() => toggleClosed(day, true)}
                >
                  Closed
                </button>
              </>
            ) : (
              <>
                <span>Closed</span>

                <span></span>

                <button
                  type="button"
                  onClick={() => toggleClosed(day, false)}
                >
                  Open
                </button>
              </>
            )}
          </div>
        );
      })}

      <label>Notes</label>

      <textarea
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <button type="submit">
          {initialValue ? "Save Changes" : "Create Assignment"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}