
import { ReactElement } from 'react';
import Head from 'next/head';

import type { NextPageWithLayout } from '../../_app';

import Layout from '../../../components/wrappers/Layout';
import ReturnGoodsContainer from '../../../components/pages/disputes/return-goods/Container';

import ReturnGoodsContextProvider from '../../../context/ReturnGoods';

const ReturnGoods: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Bridge by ALAT - Return goods</title>
      </Head>

      <ReturnGoodsContextProvider>
        <ReturnGoodsContainer />
      </ReturnGoodsContextProvider>
    </>
  );
};

ReturnGoods.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ReturnGoods;
