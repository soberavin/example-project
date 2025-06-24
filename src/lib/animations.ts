import type { Variants } from "framer-motion";

// Конфигурация анимаций для результатов поиска
// TODO: Использовать константные анимации, но предварительно дебаг
export const searchResultsAnimation = {
  container: {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { 
      duration: 0.2, 
      ease: "easeOut",
      opacity: { duration: 0.15 }
    }
  },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: (index: number) => ({
      duration: 0.2,
      delay: index * 0.03,
      ease: "easeOut"
    })
  },
  emptyState: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 }
  },
  errorState: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2 }
  }
};

// Варианты анимации для списка
export const listAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.03
    }
  }
};

// Варианты анимации для элементов списка
export const itemAnimation: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300
    }
  }
}; 