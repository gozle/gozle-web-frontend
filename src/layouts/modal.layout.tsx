import React from 'react';

export const WithModalLayout = ({ children }: { children: JSX.Element }) => (
  <>
    {children}
    <div id="modal-root" />
  </>
);
