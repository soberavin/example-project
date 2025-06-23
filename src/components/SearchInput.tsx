import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { SearchIcon } from "@/components/icons";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  isLoading: boolean;
  hasResults: boolean;
}

export function SearchInput({ 
  value, 
  onChange, 
  onClear, 
  isLoading, 
  hasResults 
}: SearchInputProps) {
  return (
    <div className="flex items-center gap-3 py-3 px-6">
      {isLoading ? (
        <Loader aria-label="Searching..." />
      ) : (
        <SearchIcon aria-hidden="true" />
      )}
      <div className="flex-1">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search..."
          className="border-0 focus-visible:ring-0 focus-visible:border-0 shadow-none h-auto p-0 text-[20px] md:text-[20px] font-medium"
          autoFocus
          role="searchbox"
          aria-label="Search lessons"
          aria-expanded={hasResults}
          aria-haspopup="listbox"
        />
      </div>
      {value && (
        <button
          onClick={onClear}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer focus:outline-none rounded px-2 py-1"
          aria-label="Clear search"
        >
          Clear
        </button>
      )}
    </div>
  );
} 