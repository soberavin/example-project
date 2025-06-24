import type { SearchEntry, SearchError } from "@/server/types";
import { SearchResult } from "./SearchResult";
import { AnimatePresence, motion } from "framer-motion";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

function EmptyState({
  title = "Hmm, nothing came up",
  subtitle = "Try looking somewhere else",
}: EmptyStateProps) {
  return (
    <motion.div
      className="text-center py-16"
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-lg font-medium text-gray-900 mb-2">{title}</div>
      <div className="text-sm text-gray-500">{subtitle}</div>
    </motion.div>
  );
}

function ErrorState({
  error,
  onRetry,
}: {
  error: SearchError;
  onRetry: () => void;
}) {
  return (
    <motion.div
      className="text-center py-16"
      role="alert"
      aria-live="assertive"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-lg font-medium text-red-600 mb-2">Search Error</div>
      <div className="text-sm text-gray-500 mb-4">{error.message}</div>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </motion.div>
  );
}

interface SearchResultsProps {
  results: SearchEntry[];
  searchTerm: string;
  error: SearchError | null;
  shouldShowEmptyState: boolean;
  onRetry: () => void;
}

export function SearchResults({
  results,
  searchTerm,
  error,
  shouldShowEmptyState,
  onRetry,
}: SearchResultsProps) {
  const hasResults = results.length > 0;

  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />;
  }

  if (shouldShowEmptyState) {
    return <EmptyState />;
  }

  if (!hasResults) {
    return null;
  }

  return (
    <div
      className="space-y-1 max-h-[640px] overflow-y-auto hidden-scrollbar"
      role="listbox"
      aria-label="Search results"
    >
      <AnimatePresence mode="wait">
        {results.map((result, index) => (
          <motion.div
            key={result.lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.2,
              delay: index * 0.03,
              ease: "easeOut",
            }}
          >
            <SearchResult result={result} searchTerm={searchTerm} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
