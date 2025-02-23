"use client";
import { useEffect, useState } from "react";

type SetValue<T> = T | ((val: T) => T);

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void] {
  // Estado inicial SEM verificar se já existe no localStorage
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Atualiza o localStorage sempre que o estado mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [key, storedValue]);

  // Define o valor e salva no localStorage imediatamente
  const setValue = (value: SetValue<T>) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Sobrescreve o localStorage no primeiro render
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
    }
  }, [key, initialValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
