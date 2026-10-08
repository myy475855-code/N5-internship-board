import { ALL, type Filters, type Internship } from "../types";

/** Search AND location AND category. */
export function filterInternships(items: Internship[], f: Filters): Internship[] {
  const q = f.query.trim().toLowerCase();
  return items.filter((i) => {
    const matchesQuery =
      q === "" || i.title.toLowerCase().includes(q) || i.company.toLowerCase().includes(q);
    const matchesLocation = f.location === ALL || i.location === f.location;
    const matchesCategory = f.category === ALL || i.category === f.category;
    return matchesQuery && matchesLocation && matchesCategory;
  });
}

export const uniqueValues = (items: Internship[], key: "location" | "category"): string[] =>
  [...new Set(items.map((i) => i[key]))].sort();
