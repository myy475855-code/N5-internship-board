import { Link } from "react-router-dom";
import type { Internship } from "../types";
import { Badge } from "./Badge";

interface InternshipCardProps {
  internship: Internship;
}

export function InternshipCard({ internship: i }: InternshipCardProps) {
  return (
    <li className="card">
      <div className="card__head">
        <h2 className="card__title">
          <Link to={`/internships/${i.id}`}>{i.title}</Link>
        </h2>
        <Badge label={i.category} tone="accent" />
      </div>
      <p className="card__meta">
        {i.company} — {i.location}
      </p>
      <ul className="tags" aria-label="Skills">
        {i.tags.map((t) => (
          <li key={t}>
            <Badge label={t} />
          </li>
        ))}
      </ul>
    </li>
  );
}
