import { Link, Outlet } from "react-router-dom";
import { useInternships } from "./hooks/useInternships";

export type AppContext = ReturnType<typeof useInternships>;

// State is lifted here so both routes share one fetch (no refetch on navigation).
export function App() {
  const ctx = useInternships();
  return (
    <div className="shell">
      <header className="header">
        <Link to="/" className="brand">Internship Board</Link>
      </header>
      <main className="main">
        <Outlet context={ctx satisfies AppContext} />
      </main>
    </div>
  );
}
