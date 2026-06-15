import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import type { NextPageWithLayout } from '../_app';

import Layout from '../../components/wrappers/Layout';
import TransactionsTabs from '../../components/pages/transactions/TransactionsTabs';
import InvoiceContainer from '../../components/pages/transactions/sales/Container';
import WalletContainer from '../../components/pages/transactions/wallet/Container';

const Transactions: NextPageWithLayout = () => {
  const router = useRouter();
  const { tab } = router.query || {};

  useEffect(() => {
    if (!tab) {
      router.push({ pathname: '/transactions', query: { tab: 'sales', status: 'all' } });
    }
  }, [router, tab]);

  return (
    <>
      <Head>
        <title>UseBridgee Inc. - Transactions</title>
      </Head>

      <div className="w-full">
        <h2 className="font-bold ff-bold text-2xl mb-3">Transactions</h2>
        <TransactionsTabs />

        <div className="w-full mt-3">
          {tab === 'sales' && <InvoiceContainer />}
          {tab === 'wallet' && <WalletContainer />}
        </div>
      </div>
    </>
  );
};

Transactions.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Transactions;
