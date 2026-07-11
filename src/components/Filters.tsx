import type {
  Building,
  ServiceType,
} from "../types/models";

interface FiltersProps {
  buildings: Building[];
  types: ServiceType[];

  selectedBuilding: string;
  selectedType: string;
  onlyAvailable: boolean;

  onBuildingChange: (id: string) => void;
  onTypeChange: (id: string) => void;
  onAvailableChange: (value: boolean) => void;
}

export default function Filters({
  buildings,
  types,
  selectedBuilding,
  selectedType,
  onlyAvailable,
  onBuildingChange,
  onTypeChange,
  onAvailableChange,
}: FiltersProps) {
  return (
    <div className="filters">
      {/* Building */}
      <div>
        <label>
          <strong>Building</strong>
        </label>

        <br />

        <select
          value={selectedBuilding}
          onChange={(e) => onBuildingChange(e.target.value)}
        >
          <option value="">All Buildings</option>

          {buildings.map((building) => (
            <option key={building.id} value={building.id}>
              {building.name}
            </option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div>
        <label>
          <strong>Type</strong>
        </label>

        <br />

        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">All Types</option>

          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {/* Available */}
      <div className="filter-checkbox">
        <label>
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => onAvailableChange(e.target.checked)}
          />

          {" "}Only show available
        </label>
      </div>
    </div>
  );
}