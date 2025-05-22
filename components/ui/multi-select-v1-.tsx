import React, { useState, useRef, useEffect } from 'react';
import { X, Check, ChevronsUpDown, Loader2 } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  onSearch: (query: string) => Promise<void> | void;
  placeholder?: string;
}

export function MultiSelectV1({
  options,
  selectedValues,
  onChange,
  onSearch,
  placeholder = 'Select options...',
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for debouncing
    searchTimeoutRef.current = setTimeout(async () => {
      if (query.trim()) {
        setIsSearching(true);
        try {
          await onSearch(query);
        } catch (error) {
          console.error('Search failed:', error);
        } finally {
          setIsSearching(false);
        }
      }
    }, 300);
  };

  const toggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const removeValue = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    onChange(selectedValues.filter((v) => v !== value));
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className="min-h-[42px] w-full bg-background border rounded-lg px-3 py-2 cursor-pointer flex flex-wrap gap-2 items-center  transition-colors"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 0);
          }
        }}
      >
        {selectedValues?.length > 0 ? (
          selectedValues.map((value) => {
            const option = options?.find((opt) => opt.value === value);
            return (
              <span
                key={value}
                className="bg-foreground text-background px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {option?.label}
                <button
                  onClick={(e) => removeValue(e, value)}
                  className="hover:bg-accent rounded-full p-0.5"
                >
                  <X size={14} />
                </button>
              </span>
            );
          })
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <div className="ml-auto flex items-center">
          <ChevronsUpDown size={18} className="text-gray-500" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-background border rounded-lg shadow-lg">
          <div className="p-2">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-transparent"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                onClick={(e) => e.stopPropagation()}
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 size={18} className="animate-spin text-blue-500" />
                </div>
              )}
            </div>
          </div>
          <div className="max-h-60 overflow-auto px-2">
            {options?.map((option) => (
              <div
                key={option.value}
                className={`px-3 py-2 cursor-pointer flex items-center justify-between hover:bg-accent ${
                  selectedValues.includes(option.value) ? 'bg-primary rounded-md' : ''
                }`}
                onClick={() => toggleOption(option.value)}
              >
                <span>{option.label}</span>
                {selectedValues.includes(option.value) && (
                  <Check size={18} className="text-white" />
                )}
              </div>
            ))}
            {options?.length === 0 && (
              <div className="px-3 py-4 text-center text-gray-500">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}