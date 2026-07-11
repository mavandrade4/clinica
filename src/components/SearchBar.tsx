interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="search">
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
    </div>
  );
}