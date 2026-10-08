export interface ApplyValues {
  name: string;
  email: string;
  coverNote: string;
}
export type ApplyErrors = Partial<Record<keyof ApplyValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateApplication(v: ApplyValues): ApplyErrors {
  const errors: ApplyErrors = {};
  if (v.name.trim().length < 2) errors.name = "Enter your full name (at least 2 characters).";
  if (!EMAIL_RE.test(v.email.trim())) errors.email = "Enter a valid email, like you@example.com.";
  const note = v.coverNote.trim().length;
  if (note < 30) errors.coverNote = `Tell us a bit more: ${30 - note} more characters needed.`;
  else if (note > 500) errors.coverNote = "Keep your note under 500 characters.";
  return errors;
}
