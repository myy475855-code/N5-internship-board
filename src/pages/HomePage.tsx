import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { AppContext } from "../App";
import { FilterSelect } from "../components/FilterSelect";
import { InternshipCard } from "../components/InternshipCard";
import { SearchBar } from "../components/SearchBar";
import { StatusMessage } from "../components/StatusMessage";
import { useDebounce } from "../hooks/useDebounce";
import { ALL } from "../types";
import { filterInternships, uniqueValues } from "../utils/filter";

export function HomePage() {
  const { state, reload } = useOutletContext<AppContext>();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(ALL);
  const [category, setCategory] = useState(ALL);
  const debouncedQuery = useDebounce(query, 250);

  const items = useMemo(() => (state.status === "success" ? state.data : []), [state]);
  const results = useMemo(
    () => filterInternships(items, { query: debouncedQuery, location, category }),
    [items, debouncedQuery, location, category],
  );

  function clearFilters() {
    setQuery("");
    setLocation(ALL);
    setCategory(ALL);
  }

  if (state.status === "loading") {
    return <StatusMessage kind="loading" title="Loading internships…" />;
  }
  if (state.status === "error") {
    return (
      <StatusMessage kind="error" title="Couldn't load internships" detail={state.message}
        actionLabel="Try again" onAction={reload} />
    );
  }

  return (
    <>
      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <FilterSelect label="Location" value={location} options={uniqueValues(items, "location")}
          onChange={setLocation} />
        <FilterSelect label="Category" value={category} options={uniqueValues(items, "category")}
          onChange={setCategory} />
      </div>
      <p className="count" aria-live="polite">
        {results.length} of {items.length} internships
      </p>
      {results.length === 0 ? (
        <StatusMessage kind="empty" title="No internships match"
          detail="Try a different search or remove a filter."
          actionLabel="Clear search and filters" onAction={clearFilters} />
      ) : (
        <ul className="grid">
          {results.map((i) => (
            <InternshipCard key={i.id} internship={i} />
          ))}
        </ul>
      )}
    </>
  );
}
