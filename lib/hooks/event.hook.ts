import { useCallback, useLayoutEffect, useRef } from 'react';

type Callback = (...args: any[]) => unknown;

// Этот хук также использует useRef, но не для хранения аргументов функции,
// а для хранения самой функции. Использование в нашем случае будет выглядеть вот так:

// const onChangeFirstName = useEvent((e: React.ChangeEvent<HTMLInputElement>) => {
//   onChange({ ...valueCopy.current, firstName: e.target.value });
// });

export const useEvent = <T extends Callback = Callback>(handler: T): T => {
  const handlerRef = useRef<T>();

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback<T>(((...args) => handlerRef.current?.(...args)) as T, []);
};
