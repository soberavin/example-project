export type LessonIcon = 'theory' | 'practice' | 'project';

export interface SearchEntryLessonInfo {
  id: string;
  icon: LessonIcon;
  type: string;
  name: string;
}

export interface SearchEntry {
  lesson: SearchEntryLessonInfo;
  breadcrumbs: string[];
  text: string;
}

export interface SearchResponse {
  results: SearchEntry[];
}

export interface SearchError {
  message: string;
  code?: string;
} 
