import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

import SessionControl from "../common/SessionControl";
import Loading from "../common/Loading";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import AccountsContextProvider from "../../context/Accounts";
import useGetQuery from "../../hooks/useGetQuery";

type Props = {
  children: React.ReactNode;
  pageName: string;
};

function Layout({ children, pageName }: Props) {
  const [cookie] = useCookies();
  const { push, pathname } = useRouter();

  useEffect(() => {
    if (!cookie?.data?.accessToken) push('/');
  }, [cookie, push]);

  const { data: meData, status: meStatus } = useGetQuery({
    endpoint: "escrow-service/api/v1/auth/me",
    queryKey: ["auth-me"],
    auth: true,
    enabled: !!cookie?.data?.accessToken,
  });

  const currentUser = meStatus === "success" && meData?.isSuccess ? meData.data : null;

  const avatarInitial = currentUser?.fullName?.trim()?.charAt(0)?.toUpperCase() || "?";

  if (!cookie?.data?.accessToken) {
    return <Loading />;
  }

  return (
    <div className=" w-full min-h-screen relative">
      <SessionControl path="/login" />
      <Sidebar />
      <AccountsContextProvider>
          <Header
            pageName={pageName}
            adminName={currentUser?.companyName || "—"}
            greetingName={currentUser?.fullName || "—"}
            avatarInitial={avatarInitial}
            companyImg={currentUser?.companyLogoUrl}
            hasUnreadNotifications
          />

          <div className="w-full text-textColor lg:pl-72">
            <main
              className={`w-full relative ${pathname === "/dashboard" ? "px-5" : "px-4 sm:px-8"} pt-[92px] pb-16`}
            >
              {children}
            </main>
          </div>
      </AccountsContextProvider>
    </div>
  );
}

export default Layout;