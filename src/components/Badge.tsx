interface BadgeProps {
  label: string;
  tone?: "tag" | "accent";
}

export function Badge({ label, tone = "tag" }: BadgeProps) {
  return <span className={`badge badge--${tone}`}>{label}</span>;
}
