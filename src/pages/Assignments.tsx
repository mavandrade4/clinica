import { useState } from "react";

import AssignmentForm from "../components/AssignmentForm";

import type { Assignment } from "../types/models";
import { useStore } from "../store/useStore";

export default function Assignments() {
  const {
    buildings,
    types,
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
  } = useStore();

  const [editing, setEditing] = useState<Assignment | undefined>();

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        gap: "2rem",
        alignItems: "flex-start",
      }}
    >
      <div style={{ flex: 2 }}>
        <AssignmentForm
          buildings={buildings}
          types={types}
          initialValue={editing}
          onSave={(assignment) => {
            if (editing) {
              updateAssignment(assignment);
            } else {
              addAssignment(assignment);
            }

            setEditing(undefined);
          }}
          onCancel={() => setEditing(undefined)}
        />
      </div>

      <div style={{ flex: 1 }}>
        <h2
          style={{ paddingBottom:"2vh" }}
        >Assignments</h2>

        {assignments.length === 0 && (
          <p>No assignments have been created yet.</p>
        )}

        {assignments.map((assignment) => {
          const building = buildings.find(
            (b) => b.id === assignment.buildingId
          );

          const type = types.find(
            (t) => t.id === assignment.typeId
          );

          return (
            <div
              key={assignment.id}
              className="card"
            >
              <h3>{type?.name}</h3>

              <p>
                <strong>Building:</strong>{" "}
                {building?.name}
              </p>

              {assignment.notes && (
                <p>
                  <strong>Notes:</strong>{" "}
                  {assignment.notes}
                </p>
              )}
              
              <br/>

              <button
                onClick={() => setEditing(assignment)}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteAssignment(assignment.id)
                }
                style={{
                  marginLeft: "10px",
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}