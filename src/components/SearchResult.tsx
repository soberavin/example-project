import { useMemo } from "react";
import type { SearchEntry, LessonIcon } from "@/server/types";
import { DocIcon, CodeIcon } from "@/components/icons";
import { highlightText } from "@/lib/highlightText";

// Constants
const MAX_PREVIEW_LENGTH = 200;

function getIconForLessonType(icon: LessonIcon) {
  const iconMap = {
    theory: <DocIcon />,
    practice: <CodeIcon />,
    project: <CodeIcon />,
  } as const;
  
  return iconMap[icon] || <DocIcon />;
}

interface SearchResultProps {
  result: SearchEntry;
  searchTerm: string;
}

export function SearchResult({ result, searchTerm }: SearchResultProps) {
  const truncatedText = useMemo(() => {
    return result.text
      .replace(/[#>\-\n]/g, "")
      .slice(0, MAX_PREVIEW_LENGTH) + "...";
  }, [result.text]);

  return (
    <div
      className="p-3 hover:bg-[#F2F1EE] rounded-2xl cursor-pointer transition-colors focus:outline-none"
      role="option"
      tabIndex={0}
      aria-selected={false}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 pt-1" aria-hidden="true">
          {getIconForLessonType(result.lesson.icon)}
        </div>
        <div className="flex-1">
          <div className="text-base text-gray-800 font-medium mb-1">
            {highlightText(result.lesson.name, searchTerm)}
          </div>
          <div className="text-sm text-gray-600 mb-1">
            {highlightText(result.breadcrumbs.join(" / "), searchTerm)}
          </div>
          <div className="text-sm text-gray-500">
            {highlightText(truncatedText, searchTerm)}
          </div>
        </div>
      </div>
    </div>
  );
} 