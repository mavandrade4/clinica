import { useStore } from "../store/useStore";

export function exportBackup() {
  const { buildings, types, assignments } = useStore.getState();

  const data = {
    buildings,
    types,
    assignments,
  };

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    {
      type: "application/json",
    }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  const today = new Date()
    .toISOString()
    .split("T")[0];

  a.href = url;
  a.download = `availability-backup-${today}.json`;

  a.click();

  URL.revokeObjectURL(url);
}

export async function importBackup(file: File) {
  const text = await file.text();

  const data = JSON.parse(text);

  if (
    !data.buildings ||
    !data.types ||
    !data.assignments
  ) {
    throw new Error("Invalid backup file.");
  }

  useStore
    .getState()
    .replaceAll(data);
}