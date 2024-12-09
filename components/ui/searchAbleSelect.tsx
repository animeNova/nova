import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Option = {
  value: string;
  label: string;
};

type SearchableSelectProps = {
  options?: Option[];
  value?: Option;
  onChange: (value: Option) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  loading?: boolean;
};

export function SearchableSelect({
  options = [], // Provide default empty array
  value,
  onChange,
  onSearch,
  placeholder = 'Select an option...',
  className,
  loading = false,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query);
      await onSearch(query);
    },
    [onSearch]
  );

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedOption = filteredOptions[highlightedIndex];
      if (selectedOption) {
        onChange(selectedOption);
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className={cn('relative w-full', className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative w-full cursor-pointer rounded-lg border  bg-background py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none ',
          className
        )}
      >
        <span className="block truncate">
          {value ? value.label : placeholder}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronsUpDown
            className="h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-background shadow-lg">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-primary" aria-hidden="true" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              className="block w-full rounded-t-md py-2 pl-10 pr-8 text-foreground shadow-sm  placeholder:text-gray-400 "
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                void handleSearch(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => void handleSearch('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <X className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </button>
            )}
          </div>

          {loading ? (
            <div className="py-2 px-3 text-gray-700">Loading...</div>
          ) : filteredOptions.length === 0 ? (
            <div className="py-2 px-3 text-gray-700">No results found</div>
          ) : (
            <ul
              className="max-h-60 overflow-auto py-1"
              role="listbox"
              tabIndex={-1}
            >
              {filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  className={cn(
                    'relative cursor-pointer select-none py-2 pl-3 pr-9',
                    index === highlightedIndex
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-900 hover:bg-indigo-50',
                    value?.value === option.value && 'font-semibold'
                  )}
                  role="option"
                  aria-selected={value?.value === option.value}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                >
                  <span className="block truncate">{option.label}</span>
                  {value?.value === option.value && (
                    <span
                      className={cn(
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                        index === highlightedIndex
                          ? 'text-white'
                          : 'text-indigo-600'
                      )}
                    >
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}