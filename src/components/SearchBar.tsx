interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="field field--grow">
      <span className="field__label">Search</span>
      <input
        type="search"
        value={value}
        placeholder="Title or company"
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
