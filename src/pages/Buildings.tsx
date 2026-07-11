import { useState } from "react";

import BuildingForm from "../components/BuildingForm";
import type { Building } from "../types/models";
import { useStore } from "../store/useStore";

export default function Buildings() {
  const {
    buildings,
    addBuilding,
    updateBuilding,
    deleteBuilding,
  } = useStore();

  const [editing, setEditing] = useState<Building | undefined>();

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
        <BuildingForm
          initialValue={editing}
          onSave={(building) => {
            if (editing) {
              updateBuilding(building);
            } else {
              addBuilding(building);
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
        
        >Buildings</h2>

        {buildings.length === 0 && (
          <p>No buildings have been created yet.</p>
        )}

        {buildings.map((building) => (
          <div
            key={building.id}
            className="card"
          >
            <h3>{building.name}</h3>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <button
                onClick={() => setEditing(building)}
              >
                Edit
              </button>

              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `Delete "${building.name}"?`
                    )
                  ) {
                    deleteBuilding(building.id);

                    if (editing?.id === building.id) {
                      setEditing(undefined);
                    }
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