import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useLocalStorage = (
  key: string,
  initialValue: string
): [string, Dispatch<SetStateAction<string>>] => {
  const getValue = (): string => {
    const storageValue: string | null = localStorage.getItem(key);

    return storageValue ? JSON.parse(storageValue) : initialValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
