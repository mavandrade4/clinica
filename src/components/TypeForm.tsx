import { useEffect, useState } from "react";
import type { ServiceType } from "../types/models";

interface TypeFormProps {
  initialValue?: ServiceType;
  onSave: (type: ServiceType) => void;
  onCancel?: () => void;
}

export default function TypeForm({
  initialValue,
  onSave,
  onCancel,
}: TypeFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialValue) {
      setName(initialValue.name);
      setDescription(initialValue.description ?? "");
    }
  }, [initialValue]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Type name is required.");
      return;
    }

    onSave({
      id: initialValue?.id ?? crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
    });

    if (!initialValue) {
      setName("");
      setDescription("");
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{initialValue ? "Edit Type" : "New Type"}</h2>

      <label>Type Name</label>

      <input
        type="text"
        value={name}
        placeholder="Example: TYPE X"
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <label>Description (optional)</label>

      <textarea
        value={description}
        placeholder="Optional description..."
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
          resize: "vertical",
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
          {initialValue ? "Save Changes" : "Add Type"}
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