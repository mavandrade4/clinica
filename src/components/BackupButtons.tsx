import { exportBackup, importBackup } from "../utils/backup";

export default function BackupButtons() {
  async function handleImport(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      await importBackup(file);

      alert("Backup imported successfully!");

      window.location.reload();
    } catch {
      alert("Invalid backup file.");
    }
  }

  return (
    <div
      className="card"
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <button onClick={exportBackup}>
        Export Backup
      </button>

      <label>
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{
            display: "none",
          }}
        />

        <button
          type="button"
          onClick={() =>
            (
              document.querySelector(
                "#backup-input"
              ) as HTMLInputElement
            )?.click()
          }
        >
          Import Backup
        </button>
      </label>

      <input
        id="backup-input"
        type="file"
        accept=".json"
        onChange={handleImport}
        hidden
      />
    </div>
  );
}