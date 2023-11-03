import React, { useEffect, useState } from 'react';

interface P {
  children: React.ReactNode;
}

export const NoSsr = ({ children }: P) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return mounted ? <>{children}</> : <></>;
};
