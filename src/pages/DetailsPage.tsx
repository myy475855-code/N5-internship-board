import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import type { AppContext } from "../App";
import { ApplyForm } from "../components/ApplyForm";
import { Badge } from "../components/Badge";
import { StatusMessage } from "../components/StatusMessage";
import type { Application } from "../types";
import type { ApplyValues } from "../utils/validation";

export function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { state, reload } = useOutletContext<AppContext>();
  // Submissions live in local component state only (no backend yet).
  const [applications, setApplications] = useState<Application[]>([]);

  if (state.status === "loading") return <StatusMessage kind="loading" title="Loading internship…" />;
  if (state.status === "error") {
    return (
      <StatusMessage kind="error" title="Couldn't load this internship" detail={state.message}
        actionLabel="Try again" onAction={reload} />
    );
  }

  const internship = state.data.find((i) => i.id === id);
  if (!internship) {
    return <StatusMessage kind="empty" title="Internship not found"
      detail="It may have been removed. Head back to the list." />;
  }
  const internshipId = internship.id;
  const applied = applications.find((a) => a.internshipId === internshipId);

  function handleSubmit(values: ApplyValues) {
    setApplications((prev) => [...prev, { internshipId, ...values }]);
  }

  return (
    <article className="details">
      <Link to="/" className="back">← All internships</Link>
      <h1>{internship.title}</h1>
      <p className="card__meta">
        {internship.company} — {internship.location} — {internship.duration} — {internship.stipend}
      </p>
      <ul className="tags">
        <li><Badge label={internship.category} tone="accent" /></li>
        {internship.tags.map((t) => (
          <li key={t}><Badge label={t} /></li>
        ))}
      </ul>
      <p>{internship.description}</p>
      <h2>What you'll do</h2>
      <ul>{internship.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
      <h2>What we're looking for</h2>
      <ul>{internship.requirements.map((r) => <li key={r}>{r}</li>)}</ul>

      {applied ? (
        <div className="success" role="status">
          <h2>Application sent</h2>
          <p>Thanks, {applied.name}. We'll email {applied.email} if there's a match.</p>
        </div>
      ) : (
        <ApplyForm internshipTitle={internship.title} onSubmit={handleSubmit} />
      )}
    </article>
  );
}
