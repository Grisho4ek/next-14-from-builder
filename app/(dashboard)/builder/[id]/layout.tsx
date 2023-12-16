import React, { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren<{}>) {
  return <div className='mx-auto flex w-full flex-grow'>{children}</div>;
}

export default Layout;
