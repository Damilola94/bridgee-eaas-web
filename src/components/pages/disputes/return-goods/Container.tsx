
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import Button from '../../../inputs/Button';

import FormIndicator from '../../create-invoice/FormIndicator';
import InvoiceSummary from './InvoiceSummary';
import OrderDetails from './OrderDetails';
import RecipientDetails from './RecipientDetails';
import useGetQuery from '../../../../hooks/useGetQuery';
import Loading from '../../../common/Loading';
import { useReturnGoodsContext } from '../../../../context/ReturnGoods';

function ReturnGoodsContainer() {
  const router = useRouter();
  const { setInvoice } = useReturnGoodsContext();
  const [formIndex, setFormIndex] = useState(0);

  const { data, status, error } = useGetQuery({
    endpoint: 'escrow',
    queryKey: ['escrow', router?.query?.slug],
    param: router?.query?.slug,
    enabled: !!router?.query?.slug
  });

  useEffect(() => {
    if (status === 'success') {
      setInvoice(data?.data);
    }
  }, [data, status, setInvoice]);

  const handleBack = () => {
    if (formIndex === 0) {
      router.back();
    } else {
      setFormIndex((state) => state -= 1);
    }
  };

  return (
    <>
      {status === 'loading' && <Loading />}

      <div className="w-full mb-3">
        <Button
          border
          onClick={handleBack}
          borderColor="border-primary"
          textColor="text-primary"
          bgColor="bg-transparent"
          paddingX="px-3"
        >
          <HiOutlineArrowLeft className="mr-2 mb-0.5" />
          Back
        </Button>
      </div>

      {status === 'success' && (
        <div className="w-full">
          <div className="flex flex-wrap -m-4">
            <div className="w-full max-w-4xl p-4">
              <FormIndicator formIndex={formIndex} />
              <div className="w-full">
                {formIndex === 0 && <OrderDetails onNext={() => setFormIndex(1)} />}
                {formIndex === 1 && <RecipientDetails onNext={() => setFormIndex(2)} />}
                {formIndex === 2 && <InvoiceSummary />}
              </div>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="w-full py-10">
          {String(error)}
        </div>
      )}
    </>
  );
};

export default ReturnGoodsContainer;
