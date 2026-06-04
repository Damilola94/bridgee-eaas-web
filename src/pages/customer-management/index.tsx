import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import type { NextPageWithLayout } from "../_app";

import Layout from "../../components/wrappers/Layout";

import CustomerManagementContainer from "../../components/pages/customer-management/all-customer-management/Container";

const Transactions: NextPageWithLayout = () => {
  const router = useRouter();
  const { tab } = router.query || {};

  useEffect(() => {
    if (!tab) {
      router.push({
        pathname: "/customer-management",
        query: { tab: "sales", status: "all" },
      });
    }
  }, [router, tab]);

  return (
    <>
      <Head>
        <title>UseBridgee Inc. - Transactions</title>
      </Head>

      <div className="w-full">
        <h2 className="font-bold ff-bold text-2xl mb-3">Customer Management</h2>
        
        <div className="w-full mt-3">
        <CustomerManagementContainer />
        </div>
      </div>
    </>
  );
};

Transactions.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Transactions;

