import type { CategoryFilter } from "../model/types";

export type FilterOption = {
  value: string | number;
  label: string;
};

type FilterSelectProps = {
  ariaLabel: string;
  name: keyof CategoryFilter;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: FilterOption[];
  className?: string;
};

export const FilterSelect = ({
  ariaLabel,
  name,
  value,
  onChange,
  options,
  className,
}: FilterSelectProps) => (
  <select
    aria-label={ariaLabel}
    name={name}
    className={className}
    value={value}
    onChange={onChange}
  >
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);
