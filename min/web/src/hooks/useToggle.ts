import { useReducer } from 'react';

export const useToggle = (initialValue: boolean = false) => {
  const [state, toggle] = useReducer((state: boolean) => !state, initialValue);
  return [state, toggle] as const;
};
