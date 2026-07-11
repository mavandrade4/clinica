import BackupButtons from "../components/BackupButtons";

export default function Backup() {
  return (
    <div className="container">
      <h1>Backup</h1>

      <p
        style={{
          marginBottom: "30px",
          color: "#9ca3af",
        }}
      >
        Export all your buildings, service types and
        assignments into a single JSON file.
        <br />
        You can later import the same file on another
        device to restore everything.
      </p>

      <BackupButtons />

      <div
        className="card"
        style={{
          marginTop: "30px",
        }}
      >
        <h2>How it works</h2>

        <ul
          style={{
            marginTop: "15px",
            paddingLeft: "20px",
          }}
        >
          <li>Click Export Backup.</li>
          <li>Save the JSON file.</li>
          <li>Transfer it to another device.</li>
          <li>Open this page.</li>
          <li>Click Import Backup.</li>
          <li>Select the JSON file.</li>
        </ul>
      </div>
    </div>
  );
}