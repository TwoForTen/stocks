import { useState } from 'react';

export type StorageKey = 'favorites' | 'theme';

const useLocalStorage = (key: StorageKey, initialValue: any) => {
  const IS_BROWSER = typeof window !== 'undefined';

  const [value, setValue] = useState<typeof initialValue>(() => {
    if (IS_BROWSER) {
      const storedValue = localStorage.getItem(key);
      return storedValue === null ? initialValue : JSON.parse(storedValue);
    }
    return;
  });

  const setLocalValue = (newValue: typeof initialValue) => {
    setValue((prevValue: typeof initialValue) => {
      const result =
        typeof newValue === 'function' ? newValue(prevValue) : newValue;
      IS_BROWSER && localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };

  return [value, setLocalValue];
};

export default useLocalStorage;
