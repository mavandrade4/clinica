import { useEffect, useState } from "react";
import type { Building } from "../types/models";

interface BuildingFormProps {
  initialValue?: Building;
  onSave: (building: Building) => void;
  onCancel?: () => void;
}

export default function BuildingForm({
  initialValue,
  onSave,
  onCancel,
}: BuildingFormProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (initialValue) {
      setName(initialValue.name);
    }
  }, [initialValue]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Building name is required.");
      return;
    }

    onSave({
      id: initialValue?.id ?? crypto.randomUUID(),
      name: name.trim(),
    });

    if (!initialValue) {
      setName("");
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{initialValue ? "Edit Building" : "New Building"}</h2>

      <label>
        Building Name
      </label>

      <input
        type="text"
        placeholder="Building name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          type="submit"
          style={{
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          {initialValue ? "Save Changes" : "Add Building"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "10px 16px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}