export function isValidAadhaar(value: string): boolean {
  return /^\d{12}$/.test(value.replace(/\s+/g, ""));
}

export function isValidMobile(value: string): boolean {
  return /^\d{10}$/.test(value.replace(/\D/g, ""));
}

export interface UploadValidation {
  valid: boolean;
  error?: "type" | "size";
}

const ALLOWED_EXTENSIONS = ["pdf", "jpg", "jpeg", "png"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export function validateUpload(file: File): UploadValidation {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
    return { valid: false, error: "type" };
  }
  if (file.size > MAX_SIZE_BYTES) {
    return { valid: false, error: "size" };
  }
  return { valid: true };
}
