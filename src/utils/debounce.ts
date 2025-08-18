export function debounce<T extends (...args: any[]) => void>(fn: T, wait: number) {
  let t: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
