/**
 * Recursively rename the keys in an object to another name.
 */
export function renameKeys(object: Object, oldKey: string, newKey: string): Object {
  const entries = Object.entries(object).map(([key, value]) => [
    key === oldKey ? newKey : key,
    typeof value === "object" && value !== null ? renameKeys(value, oldKey, newKey) : value,
  ]);
  return Object.fromEntries(entries);
}

/**
 * Get the base address of an url with protocol information and www subdomain stripped.
 */
export function baseURL(url: string) {
  const BASE_URL = /(?:(?:http|ftp|https):\/\/)?(?:www\.)?([^/]*)/;
  const match = BASE_URL.exec(url);
  return match && match.length >= 2 ? match[1] : "";
}

/**
 * Format the supplied UNIX nanosecond timestamp string into a human-readable format.
 */
export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const days = now.getDay() - date.getDay();
  const years = now.getFullYear() - date.getFullYear();

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: years ? "numeric" : undefined,
    hour: days ? "numeric" : undefined,
    minute: days ? "numeric" : undefined,
  };

  return date.toLocaleDateString(undefined, options);
}
