import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { searchShow } from "@/app/(admin)/actions/show/show.server";
interface SearchSelectProps {
  value?: string;
  onChange: (value: string) => void;
}

export function SearchSelect({ value, onChange }: SearchSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleSearch = React.useCallback(async (search: string) => {
    setLoading(true);
    try {
      await searchShow(search).then((res) => {
        setItems(res);

      });
    } catch (error) {
      console.error("Failed to search:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    handleSearch("");
  }, [handleSearch]);

  const selectedItem = React.useMemo(
    () => items.find((item) => item.value === value),
    [items, value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedItem ? selectedItem.label : "Select item..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search items..."
            onValueChange={handleSearch}
            className="h-9"
          />
          <CommandEmpty>
            {loading ? "Loading..." : "No items found."}
          </CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  onChange(currentValue);
                  setOpen(false);
                }}
              >
                {item.label}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}