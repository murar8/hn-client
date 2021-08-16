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
    hour: !days ? "numeric" : undefined,
    minute: !days ? "numeric" : undefined,
  };

  return date.toLocaleDateString(undefined, options);
}

/**
 * Generate vibrant, "evenly spaced" colours (i.e. no clustering).
 * See: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
 */
export function rainbow(quantity: number, step: number) {
  const h = step / quantity;
  const i = ~~(h * 6);
  const f = h * 6 - i;
  const q = 1 - f;

  const [r, g, b] = [
    [1, f, 0],
    [q, 1, 0],
    [0, 1, f],
    [0, q, 1],
    [f, 0, 1],
    [1, 0, q],
  ][i % 6];

  const c =
    "#" +
    ("00" + (~~(r * 255)).toString(16)).slice(-2) +
    ("00" + (~~(g * 255)).toString(16)).slice(-2) +
    ("00" + (~~(b * 255)).toString(16)).slice(-2);
  return c;
}
