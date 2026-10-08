import { useCallback, useEffect, useReducer } from "react";
import { fetchInternships } from "../api/internships";
import type { Internship } from "../types";

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: Internship[] };

type Action =
  | { type: "fetch" }
  | { type: "success"; data: Internship[] }
  | { type: "failure"; message: string };

// useReducer: the three statuses are mutually exclusive, so a reducer makes
// impossible states (loading + error together) unrepresentable.
function reducer(_state: State, action: Action): State {
  switch (action.type) {
    case "fetch":
      return { status: "loading" };
    case "success":
      return { status: "success", data: action.data };
    case "failure":
      return { status: "error", message: action.message };
  }
}

export function useInternships() {
  const [state, dispatch] = useReducer(reducer, { status: "loading" });
  const [attempt, retry] = useReducer((n: number) => n + 1, 0);

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: "fetch" });
    fetchInternships(controller.signal)
      .then((data) => dispatch({ type: "success", data }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        dispatch({
          type: "failure",
          message: err instanceof Error ? err.message : "Something went wrong.",
        });
      });
    return () => controller.abort();
  }, [attempt]);

  const reload = useCallback(() => retry(), []);
  return { state, reload };
}
