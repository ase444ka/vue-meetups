export function localDate(date) {
  return new Date(date).toLocaleString(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}