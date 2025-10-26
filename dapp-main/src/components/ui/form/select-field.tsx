import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = { name: string; value: string };

type SelectFieldProps = {
  name: string;
  options: Option[];
  placeholder?: string;
  value?: string;
  handleValue?: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

export default function SelectField({
  options,
  name,
  placeholder = "Select",
  value,
  handleValue,
  className,
  disabled,
}: SelectFieldProps) {
  return (
    <Select
      name={name}
      defaultValue={value}
      onValueChange={handleValue}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options?.map((option, index) => (
          <SelectItem key={index} value={option.value}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
