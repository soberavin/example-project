import type { SearchResponse } from './types';
import { createMockSearchEntry } from './mockData';

function getRandomDelay(): number {
  return Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
}

export async function mockSearchApi(signal?: AbortSignal): Promise<SearchResponse> {
  // Simulate random delay between 200-1000ms
  const delay = getRandomDelay();
  
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      // Generate between 6-10 results for more variety
      const resultCount = Math.floor(Math.random() * 5) + 6;
      const results = Array.from({ length: resultCount }, () => createMockSearchEntry());
      
      resolve({
        results
      });
    }, delay);

    // Handle abort signal
    if (signal) {
      const handleAbort = () => {
        clearTimeout(timer);
        reject(new DOMException("Search request was cancelled", "AbortError"));
      };
      
      if (signal.aborted) {
        handleAbort();
      } else {
        signal.addEventListener("abort", handleAbort);
      }
    }
  });
}

export function fetchMockSearchResults(signal?: AbortSignal): Promise<SearchResponse> {
  return mockSearchApi(signal);
} 
