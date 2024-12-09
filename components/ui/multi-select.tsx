import React, { useState, useEffect, useRef } from 'react';
import { X, Check, ChevronsUpDown } from 'lucide-react';
import { clsx } from 'clsx';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  defaultValue?: Option[];
  onChange: (selectedOptions: Option[]) => void;
  onSearch: (query: string) => Promise<void> | null;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  defaultValue = [],
  onChange,
  onSearch,
  placeholder = 'Select options...',
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>(defaultValue);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    const isSelected = selected.some((item) => item.value === option.value);
    let newSelected: Option[];
    
    if (isSelected) {
      newSelected = selected.filter((item) => item.value !== option.value);
    } else {
      newSelected = [...selected, option];
    }
    
    setSelected(newSelected);
    onChange(newSelected);
  };

  const handleRemove = (optionToRemove: Option, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = selected.filter((option) => option.value !== optionToRemove.value);
    setSelected(newSelected);
    onChange(newSelected);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    await onSearch(query);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={clsx('relative w-full', className)} ref={containerRef}>
      <div
        className={clsx(
          'relative flex min-h-[42px] w-full flex-wrap items-center gap-1 rounded-md border bg-background px-3 py-2',
          'cursor-text transition-colors duration-200',
          isFocused ? 'border-blue-500 ring-2 ' : 'border',
          'hover:border-gray-400'
        )}
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        {selected.map((option) => (
          <span
            key={option.value}
            className="inline-flex items-center gap-1 rounded-md bg-foreground px-2 py-1 text-sm text-background"
          >
            {option.label}
            <button
              type="button"
              onClick={(e) => handleRemove(option, e)}
              className="inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-blue-200"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        
        <input
          ref={inputRef}
          type="text"
          className={clsx(
            'flex-1 border-0 bg-transparent p-0.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0',
            selected.length > 0 ? 'w-20' : 'w-full'
          )}
          placeholder={selected.length === 0 ? placeholder : ''}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
        />
        
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronsUpDown className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-foreground py-1 shadow-lg">
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">No options found</div>
          ) : (
            filteredOptions.map((option) => {
              const isOptionSelected = selected.some((item) => item.value === option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  className={clsx(
                    'flex w-full items-center justify-between px-4 py-2 text-sm',
                    'transition-colors duration-150',
                    isOptionSelected
                      ? 'text-primary'
                      : 'text-gray-900 hover:bg-gray-100'
                  )}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                  {isOptionSelected && <Check className="h-4 w-4" />}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}