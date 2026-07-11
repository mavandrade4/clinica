export interface Building {
  id: string;
  name: string;
}

export interface ServiceType {
  id: string;
  name: string;
  description?: string;
}

export interface DaySchedule {
  open: string;
  close: string;
}

export interface Schedule {
  monday?: DaySchedule;
  tuesday?: DaySchedule;
  wednesday?: DaySchedule;
  thursday?: DaySchedule;
  friday?: DaySchedule;
  saturday?: DaySchedule;
  sunday?: DaySchedule;
}

export interface Assignment {
  id: string;
  buildingId: string;
  typeId: string;
  schedule: Schedule;
  notes: string;
}