import React, { useCallback, useMemo } from "react";
// @ts-ignore
import Select from "react-select";

interface DropdownProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value: string | null;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange, value }) => {
  const handleChange = useCallback(
    (selectedOption: any) => {
      onChange(selectedOption.value);
    },
    [onChange]
  );

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={selectedOption}
      styles={{
        menu: (base: any) => ({
          ...base,
          maxHeight: "400px",
          backgroundColor: "var(--color-background-100)",
        }),
        control: (base: any) => ({
          ...base,
          fontSize: "0.875rem",
          backgroundColor: "var(--color-background-200)",
          color: "var(--color-text-100)",
          borderColor: "var(--color-background-100)",
          borderRadius: "0.5rem",
          outline: "none",
          "&:hover": {
            borderColor: "transparent",
          },
        }),
        singleValue: (base: any) => ({
          ...base,
          color: "var(--color-text-100)",
        }),
        option: (base: any, state: any) => ({
          ...base,
          backgroundColor: state.isSelected
            ? "var(--color-primary-100)"
            : "var(--color-background-100)",
          "&:hover": {
            backgroundColor: "var(--color-background-200)",
          },
        }),
      }}
    />
  );
};

export default Dropdown;
