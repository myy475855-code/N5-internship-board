import { useState, type FormEvent } from "react";
import { validateApplication, type ApplyValues } from "../utils/validation";
import { FormField } from "./FormField";

interface ApplyFormProps {
  internshipTitle: string;
  onSubmit: (values: ApplyValues) => void;
}

const EMPTY: ApplyValues = { name: "", email: "", coverNote: "" };

export function ApplyForm({ internshipTitle, onSubmit }: ApplyFormProps) {
  const [values, setValues] = useState<ApplyValues>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof ApplyValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validateApplication(values);
  const visible = (k: keyof ApplyValues): string | undefined =>
    submitted || touched[k] ? errors[k] : undefined;

  const set = (k: keyof ApplyValues) => (v: string) => setValues((prev) => ({ ...prev, [k]: v }));
  const blur = (k: keyof ApplyValues) => () => setTouched((prev) => ({ ...prev, [k]: true }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;
    onSubmit({
      name: values.name.trim(),
      email: values.email.trim(),
      coverNote: values.coverNote.trim(),
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h2>Apply for {internshipTitle}</h2>
      <FormField id="name" label="Full name" value={values.name} error={visible("name")}
        onChange={set("name")} onBlur={blur("name")} />
      <FormField id="email" type="email" label="Email" value={values.email} error={visible("email")}
        onChange={set("email")} onBlur={blur("email")} />
      <FormField id="coverNote" multiline label="Cover note" value={values.coverNote}
        error={visible("coverNote")} onChange={set("coverNote")} onBlur={blur("coverNote")} />
      <button type="submit" className="btn">Send application</button>
    </form>
  );
}
