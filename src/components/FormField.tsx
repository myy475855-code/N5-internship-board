interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  error?: string | undefined;
  multiline?: boolean;
  type?: "text" | "email";
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function FormField({
  id,
  label,
  value,
  error,
  multiline = false,
  type = "text",
  onChange,
  onBlur,
}: FormFieldProps) {
  const common = {
    id,
    value,
    onBlur,
    "aria-invalid": error ? true : false,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
  return (
    <div className={`field${error ? " field--error" : ""}`}>
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      {multiline ? (
        <textarea rows={5} {...common} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type={type} {...common} onChange={(e) => onChange(e.target.value)} />
      )}
      {error && (
        <p id={`${id}-error`} className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
