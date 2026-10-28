/**
 * Standard client & server-side validation functions
 */

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/**
 * Validates whether string is a valid email address
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validates password strength (minimum 8 chars, 1 uppercase, 1 lowercase, 1 number)
 */
export function isStrongPassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (!password || password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must include at least one lowercase letter.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must include at least one number.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates Sri Lankan National Identity Card (NIC) format
 * Supports both old (9 digits + V/X) and new (12 digits) formats
 */
export function isValidSriLankanNIC(nic: string): boolean {
  if (!nic || typeof nic !== "string") return false;
  const clean = nic.trim().toUpperCase();
  // Old format: 9 digits followed by V or X
  const oldRegex = /^[0-9]{9}[VX]$/;
  // New format: 12 digits
  const newRegex = /^[0-9]{12}$/;
  return oldRegex.test(clean) || newRegex.test(clean);
}

/**
 * Basic string sanitization to prevent common XSS characters in plain text
 */
export function sanitizeString(input: string): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
