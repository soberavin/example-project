import { useState, useEffect, useCallback, useRef } from "react";
import { fetchMockSearchResults } from "@/server/mockApi";
import type { SearchEntry, SearchError } from "@/server/types";
import { useDebounce } from "./useDebounce";

interface SearchState {
  isLoading: boolean;
  error: SearchError | null;
  results: SearchEntry[];
  lastResults: SearchEntry[]; // Сохраняем последние результаты
}

interface UseSearchOptions {
  debounceDelay?: number;
}

export function useSearch(searchTerm: string, options: UseSearchOptions = {}) {
  const { debounceDelay = 300 } = options;
  
  const [searchState, setSearchState] = useState<SearchState>({
    isLoading: false,
    error: null,
    results: [],
    lastResults: [],
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  const performSearch = useCallback(async (term: string) => {
    // Abort previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Clear results and error if search term is empty - показываем последние результаты
    if (!term.trim()) {
      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        error: null,
        results: prev.lastResults,
      }));
      return;
    }

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();

    setSearchState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetchMockSearchResults(abortControllerRef.current?.signal);

      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        error: null,
        results: response.results,
        lastResults: response.results, // Сохраняем как последние результаты
      }));
    } catch (error) {
      if (!abortControllerRef.current?.signal.aborted) {
        const searchError: SearchError = error instanceof Error 
          ? { message: error.message, code: error.name }
          : { message: 'An unexpected error occurred' };
        
        setSearchState(prev => ({
          ...prev,
          isLoading: false,
          error: searchError,
        }));
      }
    }
  }, []);

  const retry = useCallback(() => {
    performSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, performSearch]);

  const clear = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      isLoading: false,
      error: null,
      results: prev.lastResults, // Показываем последние результаты вместо пустых
    }));
  }, []);

  useEffect(() => {
    performSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, performSearch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...searchState,
    retry,
    clear,
    hasResults: searchState.results.length > 0,
    shouldShowEmptyState: !searchState.isLoading && 
                         searchState.results.length === 0 && 
                         !searchState.error && 
                         debouncedSearchTerm.trim().length > 0 &&
                         searchState.lastResults.length === 0,
  };
} 