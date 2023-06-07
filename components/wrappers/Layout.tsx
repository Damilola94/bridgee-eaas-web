import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

import SessionControl from '../common/SessionControl';
import Loading from '../common/Loading';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import AccountsContextProvider from '../../context/Accounts';
import ListFilterContextProvider from '../../context/ListFilter';

type Props = {
  children: React.ReactNode
};

function Layout({ children }: Props) {
  const [cookie] = useCookies();
  const { push, pathname } = useRouter();

  useEffect(() => {
    if (!cookie?.data?.accessToken) push('/login');
  }, [cookie, push]);

  if (!cookie?.data?.accessToken) {
    return <Loading />;
  }

  return (
    <div className="bg-secondary w-full h-full min-h-screen relative">
      <SessionControl path="/login" />
      <Sidebar />
      <AccountsContextProvider>
        <ListFilterContextProvider>
          <Header />
          <div className="w-full max-w-screen-2xl text-textColor lg:pl-72">
            <main className={`w-full relative ${pathname === '/dashboard' ? 'px-5' : 'px-4 sm:px-8'} pt-[92px] pb-16`}>
              {children}
            </main>
          </div>
        </ListFilterContextProvider>
      </AccountsContextProvider>
    </div>
  );
}

export default Layout;
