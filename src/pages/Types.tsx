import { useState } from "react";

import TypeForm from "../components/TypeForm";
import type { ServiceType } from "../types/models";
import { useStore } from "../store/useStore";

export default function Types() {
  const {
    types,
    addType,
    updateType,
    deleteType,
  } = useStore();

  const [editing, setEditing] = useState<ServiceType | undefined>();

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        padding: "2rem",
        alignItems: "flex-start",
      }}
    >
      {/* Form */}
      <div style={{ flex: 1 }}>
        <TypeForm
          initialValue={editing}
          onSave={(type) => {
            if (editing) {
              updateType(type);
            } else {
              addType(type);
            }

            setEditing(undefined);
          }}
          onCancel={() => setEditing(undefined)}
        />
      </div>

      {/* List */}
      <div style={{ flex: 2 }}>
        <h2
          style={{ paddingBottom:"2vh" }}
        >Service Types</h2>

        {types.length === 0 && (
          <p>No service types have been created yet.</p>
        )}

        {types.map((type) => (
          <div
            className="card"
          >
            <h3>{type.name}</h3>

            {type.description && (
              <p>{type.description}</p>
            )}

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <button
                onClick={() => setEditing(type)}
              >
                Edit
              </button>

              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `Delete "${type.name}"?`
                    )
                  ) {
                    deleteType(type.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}