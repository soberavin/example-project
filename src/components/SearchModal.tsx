import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
  useSearch,
  useHotkey,
  usePlatform,
  useModal,
  useEscapeKey,
} from "@/hooks";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";

// Constants
const SEARCH_DEBOUNCE_DELAY = 300;
const MODAL_STYLES = {
  minWidth: "700px",
  maxWidth: "716px",
} as const;

export default function SearchModal() {
  const [searchTerm, setSearchTerm] = useState("");

  // Используем кастомные хуки
  const { shortcutKey } = usePlatform();
  const {
    isOpen: isSearchOpen,
    setIsOpen: setIsSearchOpen,
    open: openSearch,
    close: closeSearch,
  } = useModal();

  const {
    isLoading,
    error,
    results,
    retry,
    clear,
    hasResults,
    shouldShowEmptyState,
  } = useSearch(searchTerm, { debounceDelay: SEARCH_DEBOUNCE_DELAY });

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
    clear();
  }, [clear]);

  // Обработка горячих клавиш
  useHotkey("k", openSearch, { ctrl: true });
  useEscapeKey(closeSearch);

  // Показываем результаты если есть данные или ошибка (но не показываем пустое состояние если есть последние результаты)
  const shouldShowResults = hasResults || shouldShowEmptyState || error;

  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogTrigger asChild>
        <button
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors focus:outline-none flex items-center gap-2 cursor-pointer"
          aria-label="Open search modal"
        >
          <span>Поиск</span>
          <span className="text-xs opacity-75 bg-white/20 px-2 py-1 rounded">
            {shortcutKey}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="border-0 shadow-2xl bg-white p-2.5 rounded-2xl gap-2 fixed top-[20%] left-[50%] translate-x-[-50%] translate-y-0 w-[95%] md:w-auto"
        style={window.innerWidth >= 768 ? MODAL_STYLES : { maxWidth: "95vw" }}
        showCloseButton={false}
      >
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={handleClearSearch}
          isLoading={isLoading}
          hasResults={hasResults}
        />

        {/* Рендерим контейнер всегда, анимация зависит от shouldShowResults */}
        <motion.div
          className={`${shouldShowResults ? "border-t pt-3" : ""}`}
          variants={{
            closed: { height: 0, opacity: 0 },
            open: { height: "auto", opacity: 1 },
          }}
          initial="closed"
          animate={shouldShowResults ? "open" : "closed"}
          transition={{
            duration: 0.2,
            ease: "easeOut",
            opacity: { duration: 0.15 },
          }}
        >
          {/* Контент отображается как и раньше */}
          <SearchResults
            results={results}
            searchTerm={searchTerm}
            error={error}
            shouldShowEmptyState={shouldShowEmptyState}
            onRetry={retry}
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
