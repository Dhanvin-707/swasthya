import { todayISO } from "./formatters";

export function isValidAadhaar(value: string): boolean {
  return /^\d{12}$/.test(value.trim());
}

export function isValidIndianMobile(value: string): boolean {
  return /^[6-9]\d{9}$/.test(value.trim());
}

export function isFutureOrToday(dateISO: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateISO) && dateISO >= todayISO();
}
