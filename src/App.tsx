import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Backup from "./pages/Backup";
import Dashboard from "./pages/Dashboard";
import Buildings from "./pages/Buildings";
import Types from "./pages/Types";
import Assignments from "./pages/Assignments";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <main className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/buildings"
              element={<Buildings />}
            />

            <Route
              path="/types"
              element={<Types />}
            />

            <Route
              path="/assignments"
              element={<Assignments />}
            />

<Route
    path="/backup"
    element={<Backup />}
/>

            {/* Redirect unknown routes */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;