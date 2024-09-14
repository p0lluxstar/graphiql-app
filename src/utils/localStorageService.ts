export const setLocalStorage = <T>(key: string, value: T): void => {
  const existingValue = localStorage.getItem(key);
  const parsedValue: T[] = existingValue ? JSON.parse(existingValue) : [];
  parsedValue.push(value);
  localStorage.setItem(key, JSON.stringify(parsedValue));
};

export const getLocalStorage = <T>(key: string): T[] | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
