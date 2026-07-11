import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Building,
  ServiceType,
  Assignment,
} from "../types/models";

interface Store {
  buildings: Building[];
  types: ServiceType[];
  assignments: Assignment[];

  // Buildings
  addBuilding: (building: Building) => void;
  updateBuilding: (building: Building) => void;
  deleteBuilding: (id: string) => void;

  // Types
  addType: (type: ServiceType) => void;
  updateType: (type: ServiceType) => void;
  deleteType: (id: string) => void;

  // Assignments
  addAssignment: (assignment: Assignment) => void;
  updateAssignment: (assignment: Assignment) => void;
  deleteAssignment: (id: string) => void;

  // Backup / Restore
  replaceAll: (data: {
    buildings: Building[];
    types: ServiceType[];
    assignments: Assignment[];
  }) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      buildings: [],
      types: [],
      assignments: [],

      // -------------------------
      // Buildings
      // -------------------------

      addBuilding: (building) =>
        set((state) => ({
          buildings: [...state.buildings, building],
        })),

      updateBuilding: (building) =>
        set((state) => ({
          buildings: state.buildings.map((b) =>
            b.id === building.id ? building : b
          ),
        })),

      deleteBuilding: (id) =>
        set((state) => ({
          buildings: state.buildings.filter((b) => b.id !== id),

          // Remove assignments linked to the deleted building
          assignments: state.assignments.filter(
            (a) => a.buildingId !== id
          ),
        })),

      // -------------------------
      // Types
      // -------------------------

      addType: (type) =>
        set((state) => ({
          types: [...state.types, type],
        })),

      updateType: (type) =>
        set((state) => ({
          types: state.types.map((t) =>
            t.id === type.id ? type : t
          ),
        })),

      deleteType: (id) =>
        set((state) => ({
          types: state.types.filter((t) => t.id !== id),

          // Remove assignments linked to the deleted type
          assignments: state.assignments.filter(
            (a) => a.typeId !== id
          ),
        })),

      // -------------------------
      // Assignments
      // -------------------------

      addAssignment: (assignment) =>
        set((state) => ({
          assignments: [...state.assignments, assignment],
        })),

      updateAssignment: (assignment) =>
        set((state) => ({
          assignments: state.assignments.map((a) =>
            a.id === assignment.id ? assignment : a
          ),
        })),

      deleteAssignment: (id) =>
        set((state) => ({
          assignments: state.assignments.filter(
            (a) => a.id !== id
          ),
        })),

      // -------------------------
      // Backup / Restore
      // -------------------------

      replaceAll: (data) =>
        set(() => ({
          buildings: data.buildings,
          types: data.types,
          assignments: data.assignments,
        })),
    }),
    {
      name: "availability-dashboard",
    }
  )
);