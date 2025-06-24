// A minimal spinner loader built with TailwindCSS utility classes
export function Loader() {
  return (
    <div className="h-4 w-4 border-2 border-t-transparent border-gray-900 rounded-full animate-spin" />
  );
}
