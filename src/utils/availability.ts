import dayjs from "dayjs";
import type { Assignment } from "../types/models";

type WeekDay =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

const days: WeekDay[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Returns today's weekday as a string.
 */
export function getCurrentDay(): WeekDay {
  return days[dayjs().day()];
}

/**
 * Returns the current time in minutes.
 */
export function getCurrentMinutes(): number {
  return dayjs().hour() * 60 + dayjs().minute();
}

/**
 * Returns true if the assignment is open RIGHT NOW.
 */
export function isAvailableNow(assignment: Assignment): boolean {
  const today = getCurrentDay();

  const schedule = assignment.schedule[today];

  if (!schedule) return false;

  const now = getCurrentMinutes();

  const open = timeToMinutes(schedule.open);
  const close = timeToMinutes(schedule.close);

  return now >= open && now < close;
}

/**
 * Returns true if the assignment is open on a specific day/time.
 *
 * Example:
 * isAvailable(assignment, "monday", "14:30")
 */
export function isAvailable(
  assignment: Assignment,
  day: WeekDay,
  time: string
): boolean {
  const schedule = assignment.schedule[day];

  if (!schedule) return false;

  const minutes = timeToMinutes(time);

  const open = timeToMinutes(schedule.open);
  const close = timeToMinutes(schedule.close);

  return minutes >= open && minutes < close;
}

/**
 * Returns the number of minutes until closing.
 * Returns null if currently closed.
 */
export function minutesUntilClose(
  assignment: Assignment
): number | null {
  const today = getCurrentDay();

  const schedule = assignment.schedule[today];

  if (!schedule) return null;

  const now = getCurrentMinutes();

  const close = timeToMinutes(schedule.close);
  const open = timeToMinutes(schedule.open);

  if (now < open || now >= close) return null;

  return close - now;
}

/**
 * Returns true if closing within X minutes.
 */
export function isClosingSoon(
  assignment: Assignment,
  threshold = 30
): boolean {
  const remaining = minutesUntilClose(assignment);

  return remaining !== null && remaining <= threshold;
}

/**
 * Returns the opening hours for today.
 */
export function getTodaySchedule(
  assignment: Assignment
): string {
  const today = getCurrentDay();

  const schedule = assignment.schedule[today];

  if (!schedule) return "Closed";

  return `${schedule.open} - ${schedule.close}`;
}

/**
 * Returns a status string:
 * "OPEN"
 * "CLOSED"
 * "CLOSING_SOON"
 */
export function getStatus(
  assignment: Assignment
): "OPEN" | "CLOSED" | "CLOSING_SOON" {
  if (!isAvailableNow(assignment)) {
    return "CLOSED";
  }

  if (isClosingSoon(assignment)) {
    return "CLOSING_SOON";
  }

  return "OPEN";
}