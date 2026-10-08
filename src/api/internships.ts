import type { Internship } from "../types";

const DELAY_MS = 900;
const ERROR_RATE = 0.2;

interface ApiResponse {
  internships: Internship[];
}

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Simulates a flaky network API backed by /mock-data.json. */
export async function fetchInternships(signal: AbortSignal): Promise<Internship[]> {
  await sleep(DELAY_MS);
  if (signal.aborted) throw new DOMException("Aborted", "AbortError");
  if (Math.random() < ERROR_RATE) {
    throw new Error("The server had a problem (simulated). Please try again.");
  }
  const res = await fetch("/mock-data.json", { signal });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  const data = (await res.json()) as ApiResponse;
  return data.internships;
}
