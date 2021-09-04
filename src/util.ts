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
 * Format the supplied UNIX epoch timestamp into a human-readable string.
 */
export function timestampToLocaleString(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const now = new Date();

  const daysSinceEpoch = (d: Date) => Math.floor(d.getTime() / (1000 * 60 * 60 * 24));

  const isCurrentYear = date.getFullYear() === now.getFullYear();
  const isCurrentDay = daysSinceEpoch(now) === daysSinceEpoch(date);

  const prefix = isCurrentDay ? "Today, " : "";

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: !isCurrentYear ? "numeric" : undefined,
    day: !isCurrentDay ? "numeric" : undefined,
    month: !isCurrentDay ? "numeric" : undefined,
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    timeStyle: "short",
  };

  const dateString = isCurrentDay
    ? date.toLocaleTimeString(undefined, timeOptions)
    : date.toLocaleDateString(undefined, dateOptions);

  return prefix + dateString;
}

const SI_UNITS = ["", "k", "M", "G", "T", "P", "E"].map((unit, i) => ({
  unit,
  divisor: Math.pow(1000, i),
  ceiling: Math.pow(1000, i + 1),
}));

/**
 * Format the supplied number into an abbreviated string with a unit suffix.
 */
export function numberToUnitString(n: number, precision: number = 1) {
  if (!Number.isFinite(n)) return n.toString();
  const abs = Math.abs(n);
  const { unit, divisor } = SI_UNITS.find(({ ceiling }) => abs < ceiling) ?? SI_UNITS[SI_UNITS.length - 1];
  const pow = Math.pow(10, precision);
  const divided = abs / divisor;
  const rounded = Math.floor((divided + Number.EPSILON) * pow) / pow;
  const prefix = n < 0 ? "-" : "";
  return prefix + rounded + unit;
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
