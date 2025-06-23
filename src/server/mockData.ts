import type { SearchEntry, LessonIcon } from './types';

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

interface MockLesson {
  icon: LessonIcon;
  type: string;
  name: string;
  breadcrumbs: string[];
  text: string;
}

const mockLessons: MockLesson[] = [
  {
    icon: 'theory',
    type: "theory",
    name: "Введение в React",
    breadcrumbs: ["Frontend", "React Основы"],
    text: "# Что такое React?\nReact — это библиотека JavaScript для создания пользовательских интерфейсов. Разработана компанией Facebook и используется для построения быстрых и интерактивных веб-приложений.\n\n> React использует компонентный подход, что делает код более организованным и переиспользуемым."
  },
  {
    icon: 'practice',
    type: "practice",
    name: "Создание первого компонента",
    breadcrumbs: ["Frontend", "React Основы", "Практика"],
    text: "# Практическое задание\nВ этом уроке мы создадим наш первый React компонент.\n\n```jsx\nfunction Welcome(props) {\n  return <h1>Привет, {props.name}!</h1>;\n}\n```\n\nВыполните следующие шаги:\n1. Создайте новый файл компонента\n2. Импортируйте React\n3. Напишите функциональный компонент"
  },
  {
    icon: 'project',
    type: "project",
    name: "Todo приложение",
    breadcrumbs: ["Frontend", "React Проекты"],
    text: "# Проект: Todo List\nВ этом проекте мы создадим полнофункциональное приложение для управления задачами.\n\n**Функционал:**\n- Добавление новых задач\n- Отметка задач как выполненных\n- Удаление задач\n- Фильтрация по статусу\n\n> Этот проект поможет вам понять работу с состоянием и обработку событий в React."
  },
  {
    icon: 'theory',
    type: "theory", 
    name: "Хуки в React",
    breadcrumbs: ["Frontend", "React Продвинутый"],
    text: "# React Hooks\nХуки позволяют использовать состояние и другие возможности React без написания классов.\n\n## useState\nХук useState позволяет добавить состояние в функциональные компоненты:\n\n```jsx\nconst [count, setCount] = useState(0);\n```\n\n## useEffect\nХук useEffect позволяет выполнять побочные эффекты в функциональных компонентах."
  },
  {
    icon: 'practice',
    type: "practice",
    name: "Работа с формами",
    breadcrumbs: ["Frontend", "React Основы", "Формы"],
    text: "# Обработка форм в React\nВ этом практическом задании мы изучим, как работать с формами в React.\n\n**Контролируемые компоненты:**\n```jsx\nfunction ContactForm() {\n  const [email, setEmail] = useState('');\n  \n  return (\n    <input \n      value={email}\n      onChange={(e) => setEmail(e.target.value)}\n    />\n  );\n}\n```\n\nПостройте форму регистрации с валидацией полей."
  },
  {
    icon: 'theory',
    type: "theory",
    name: "Жизненный цикл компонентов",
    breadcrumbs: ["Frontend", "React Продвинутый", "Lifecycle"],
    text: "# Жизненный цикл React компонентов\nКаждый компонент React проходит через несколько фаз в своем жизненном цикле.\n\n**Основные фазы:**\n1. **Mounting** - компонент создается и вставляется в DOM\n2. **Updating** - компонент обновляется\n3. **Unmounting** - компонент удаляется из DOM\n\n> В функциональных компонентах жизненный цикл управляется с помощью хука useEffect."
  },
  {
    icon: 'project',
    type: "project",
    name: "Интернет-магазин",
    breadcrumbs: ["Frontend", "React Проекты", "E-commerce"],
    text: "# Проект: Интернет-магазин\nСоздаем полноценный интернет-магазин с корзиной и каталогом товаров.\n\n**Основные компоненты:**\n- Каталог товаров с фильтрацией\n- Корзина покупок\n- Форма оформления заказа\n- Пагинация результатов\n\n**Технологии:**\n- React Router для навигации\n- Context API для управления состоянием\n- Local Storage для сохранения корзины"
  },
  {
    icon: 'practice',
    type: "practice",
    name: "API интеграция",
    breadcrumbs: ["Frontend", "React Продвинутый", "API"],
    text: "# Работа с API в React\nВ этом практическом задании изучаем, как загружать данные с сервера.\n\n**Использование fetch:**\n```jsx\nuseEffect(() => {\n  fetch('/api/users')\n    .then(response => response.json())\n    .then(data => setUsers(data))\n    .catch(error => console.error('Error:', error));\n}, []);\n```\n\n**Обработка состояний загрузки:**\n- Loading состояние\n- Error handling\n- Отображение данных"
  },
  {
    icon: 'theory',
    type: "theory",
    name: "TypeScript и React",
    breadcrumbs: ["Frontend", "TypeScript", "Интеграция"],
    text: "# TypeScript в React проектах\nTypeScript добавляет статическую типизацию в JavaScript, что делает код более надежным и читаемым.\n\n**Типизация пропсов:**\n```tsx\ninterface Props {\n  name: string;\n  age: number;\n  isActive?: boolean;\n}\n\nfunction User({ name, age, isActive = false }: Props) {\n  return <div>{name} ({age})</div>;\n}\n```\n\n> TypeScript помогает находить ошибки на этапе разработки, а не в runtime."
  },
  {
    icon: 'project',
    type: "project",
    name: "Музыкальный плеер",
    breadcrumbs: ["Frontend", "React Проекты", "Media"],
    text: "# Проект: Музыкальный плеер\nСоздаем современный веб-плеер с полным функционалом.\n\n**Возможности:**\n- Воспроизведение аудио файлов\n- Плейлисты и очереди\n- Визуализация звука\n- Регулировка громкости\n- Поиск по трекам\n\n**Технические особенности:**\n- Web Audio API\n- Canvas для визуализации\n- Local Storage для сохранения плейлистов\n- Drag & Drop для загрузки файлов"
  },
  {
    icon: 'theory',
    type: "theory",
    name: "Производительность React",
    breadcrumbs: ["Frontend", "React Продвинутый", "Оптимизация"],
    text: "# Оптимизация производительности React приложений\nИзучаем техники для повышения производительности React приложений.\n\n**React.memo:**\n```jsx\nconst MemoizedComponent = React.memo(function MyComponent({ name }) {\n  return <div>{name}</div>;\n});\n```\n\n**useMemo и useCallback:**\n- useMemo для мемоизации вычислений\n- useCallback для мемоизации функций\n\n**Профилирование:**\n- React DevTools Profiler\n- Chrome DevTools Performance"
  },
  {
    icon: 'practice',
    type: "practice",
    name: "Тестирование компонентов",
    breadcrumbs: ["Frontend", "Testing", "Jest"],
    text: "# Тестирование React компонентов\nВ этом практическом занятии изучаем, как писать тесты для React компонентов.\n\n**React Testing Library:**\n```jsx\nimport { render, screen, fireEvent } from '@testing-library/react';\n\ntest('renders button and responds to click', () => {\n  render(<Button onClick={handleClick}>Click me</Button>);\n  \n  const button = screen.getByRole('button');\n  fireEvent.click(button);\n  \n  expect(handleClick).toHaveBeenCalled();\n});\n```\n\n**Типы тестов:**\n- Unit тесты компонентов\n- Integration тесты\n- E2E тестирование"
  },
  {
    icon: 'project',
    type: "project",
    name: "Социальная сеть",
    breadcrumbs: ["Frontend", "React Проекты", "Full-stack"],
    text: "# Проект: Мини-социальная сеть\nРазрабатываем социальную платформу с базовым функционалом.\n\n**Основные возможности:**\n- Регистрация и авторизация\n- Профили пользователей\n- Лента новостей\n- Система лайков и комментариев\n- Личные сообщения\n- Поиск пользователей\n\n**Архитектура:**\n- React + Redux Toolkit\n- Real-time updates с WebSocket\n- JWT авторизация\n- Responsive дизайн"
  },
  {
    icon: 'theory',
    type: "theory",
    name: "Управление состоянием",
    breadcrumbs: ["Frontend", "State Management", "Redux"],
    text: "# Управление состоянием в больших приложениях\nИзучаем различные подходы к управлению состоянием в React приложениях.\n\n**Context API:**\n```jsx\nconst ThemeContext = createContext();\n\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('light');\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n```\n\n**Когда использовать:**\n- Context API для простых случаев\n- Redux для сложных приложений\n- Zustand как альтернатива"
  },
  {
    icon: 'practice',
    type: "practice",
    name: "Анимации в React",
    breadcrumbs: ["Frontend", "Animations", "CSS"],
    text: "# Создание анимаций в React\nПрактическое занятие по добавлению анимаций в React приложения.\n\n**CSS Transitions:**\n```css\n.fade-enter {\n  opacity: 0;\n}\n\n.fade-enter-active {\n  opacity: 1;\n  transition: opacity 300ms;\n}\n```\n\n**Framer Motion:**\n```jsx\nimport { motion } from 'framer-motion';\n\n<motion.div\n  initial={{ opacity: 0, y: 20 }}\n  animate={{ opacity: 1, y: 0 }}\n  exit={{ opacity: 0, y: -20 }}\n>\n  Content\n</motion.div>\n```\n\n**Практические задания:**\n- Анимированные переходы между страницами\n- Hover эффекты\n- Loading анимации"
  }
];

export function createMockSearchEntry(): SearchEntry {
  const randomLesson = mockLessons[Math.floor(Math.random() * mockLessons.length)];
  
  return {
    lesson: {
      id: generateUUID(),
      icon: randomLesson.icon,
      type: randomLesson.type,
      name: randomLesson.name
    },
    breadcrumbs: randomLesson.breadcrumbs,
    text: randomLesson.text
  };
} 
