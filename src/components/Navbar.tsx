import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "#2563eb" : "#374151",
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    backgroundColor: isActive ? "#dbeafe" : "transparent",
  });

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Availability Dashboard</h2>
      </div>

      <div className="navbar-links">
        <NavLink to="/" style={linkStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/buildings" style={linkStyle}>
          Buildings
        </NavLink>

        <NavLink to="/types" style={linkStyle}>
          Types
        </NavLink>

        <NavLink to="/assignments" style={linkStyle}>
          Assignments
        </NavLink>

        <NavLink to="/backup" style={linkStyle}>
          Backup
        </NavLink>
      </div>
    </nav>
  );
}