import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

export function YearPicker({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (date: string | undefined) => void;
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 201 }, (_, i) => 1900 + i);

  const handleYearChange = (year: string) => {
    const date = year;;
    onChange?.(date);
  };

  return (
    <Select
      value={value ? value : undefined}
      onValueChange={handleYearChange}
    >
      <SelectTrigger className="w-[200px]">
        <CalendarIcon className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}