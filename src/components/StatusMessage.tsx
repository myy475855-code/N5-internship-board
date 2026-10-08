interface StatusMessageProps {
  kind: "loading" | "empty" | "error";
  title: string;
  detail?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function StatusMessage({ kind, title, detail, actionLabel, onAction }: StatusMessageProps) {
  return (
    <div className={`status status--${kind}`} role={kind === "error" ? "alert" : "status"}>
      {kind === "loading" && <span className="spinner" aria-hidden="true" />}
      <h2>{title}</h2>
      {detail && <p>{detail}</p>}
      {actionLabel && onAction && (
        <button type="button" className="btn" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
