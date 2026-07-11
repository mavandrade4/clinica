import { useMemo, useState } from "react";

import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import AvailabilityCard from "../components/AvailabilityCard";

import { useStore } from "../store/useStore";
import { isAvailableNow } from "../utils/availability";

export default function Dashboard() {
  const { assignments, buildings, types } = useStore();

  const [search, setSearch] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(true);

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const building = buildings.find(
        (b) => b.id === assignment.buildingId
      );

      const type = types.find(
        (t) => t.id === assignment.typeId
      );

      if (!building || !type) return false;

      // Search
      if (
        search &&
        !type.name.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }

      // Building
      if (
        selectedBuilding &&
        assignment.buildingId !== selectedBuilding
      ) {
        return false;
      }

      // Type
      if (
        selectedType &&
        assignment.typeId !== selectedType
      ) {
        return false;
      }

      // Availability
      if (
        onlyAvailable &&
        !isAvailableNow(assignment)
      ) {
        return false;
      }

      return true;
    });
  }, [
    assignments,
    buildings,
    types,
    search,
    selectedBuilding,
    selectedType,
    onlyAvailable,
  ]);

  return (
    <div className="container">
      <h1>Availability Dashboard</h1>

      <p>
        {new Date().toLocaleString()}
      </p>

      <div className="search">
    
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search service..."
        />
      </div>

      <Filters
        buildings={buildings}
        types={types}
        selectedBuilding={selectedBuilding}
        selectedType={selectedType}
        onlyAvailable={onlyAvailable}
        onBuildingChange={setSelectedBuilding}
        onTypeChange={setSelectedType}
        onAvailableChange={setOnlyAvailable}
      />

      <h2>
        Results ({filteredAssignments.length})
      </h2>
      <br/>
      <div className="grid">
      {filteredAssignments.length === 0 && (
        <div
          className="card"
        >
          No matching services found.
        </div>
      )}

      {filteredAssignments.map((assignment) => {
        const building = buildings.find(
          (b) => b.id === assignment.buildingId
        );
        const type = types.find(
          (t) => t.id === assignment.typeId
        );
        if (!building || !type) return null;
        return (
          <AvailabilityCard
            key={assignment.id}
            assignment={assignment}
            building={building}
            type={type}
          />
        );
      })}
      </div>
    </div>
  );
}