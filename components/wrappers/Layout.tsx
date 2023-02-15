import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

import SessionControl from '../common/SessionControl';
import Loading from '../common/Loading';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import ListFilterContextProvider from '../../context/ListFilter';

type Props = {
  children: React.ReactNode
};

function Layout({ children }: Props) {
  const [cookie] = useCookies();
  const router = useRouter();

  useEffect(() => {
    if (!cookie?.data?.accessToken) router.push('/login');
  }, [cookie, router]);

  if (!cookie?.data?.accessToken) {
    return <Loading />;
  }

  return (
    <div className="bg-secondary w-full h-full min-h-screen relative">
      <SessionControl path="/login" />
      <Sidebar />
      <ListFilterContextProvider>
        <Header />
        <div className="w-full text-textColor lg:pl-72">
          <main className="w-full relative max-w-screen-xl px-5 pt-[92px] pb-16">
            {children}
          </main>
        </div>
      </ListFilterContextProvider>
    </div>
  );
}

export default Layout;
