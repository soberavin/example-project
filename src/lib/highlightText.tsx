import React from "react";

export function highlightText(
  text: string,
  searchTerm: string
): React.ReactElement[] {
  // If нет поискового запроса – рендерим текст как есть
  if (!searchTerm) {
    return [<span key="0">{text}</span>];
  }

  // Экранируем спец-символы, чтобы регулярка не падала на "[" или "." и т.д.
  const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Флаги: i  – регистронезависимо; g не нужен при split, но оставим – split вернёт все вхождения
  const regex = new RegExp(`(${escapedTerm})`, "gi");

  const parts = text.split(regex);

  // split с капчур-группой возвращает: [text, match, text, match, ...].
  // Все нечётные индексы = совпадения ⇒ можно подсветить без вызова regex.test,
  // что решает проблему c lastIndex при глобальном флаге.
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-bold">
        {part}
      </strong>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}
