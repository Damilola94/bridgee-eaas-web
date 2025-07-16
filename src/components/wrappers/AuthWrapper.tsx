import React from 'react';
import Head from 'next/head';

type Props = {
  title: string,
  children: React.ReactNode
}

function AuthWrapper({ title, children }: Props) {
  return (
    <div className="h-screen">
      <Head>
        <title>{title}</title>
      </Head>

      <div className="h-screen w-full  overflow-auto bg-white">
        {children}
      </div>
    </div>
  );
}

export default AuthWrapper;
