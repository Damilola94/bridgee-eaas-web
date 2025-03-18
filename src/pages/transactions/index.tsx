import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import type { NextPageWithLayout } from '../_app';

import Layout from '../../components/wrappers/Layout';
import TransactionsTabs from '../../components/pages/transactions/TransactionsTabs';
import InvoiceContainer from '../../components/pages/transactions/invoice/Container';
import WalletContainer from '../../components/pages/transactions/wallet/Container';

const Transactions: NextPageWithLayout = () => {
  const router = useRouter();
  const { tab } = router.query || {};

  useEffect(() => {
    if (!tab) {
      router.push({ pathname: '/transactions', query: { tab: 'invoice', status: 'all' } });
    }
  }, [router, tab]);

  return (
    <>
      <Head>
        <title>UseBridge Escrow - Transactions</title>
      </Head>

      <div className="w-full">
        <h2 className="font-bold ff-bold text-2xl mb-3">Transactions</h2>
        <TransactionsTabs />

        <div className="w-full max-w-7xl mt-3">
          {tab === 'invoice' && <InvoiceContainer />}
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
