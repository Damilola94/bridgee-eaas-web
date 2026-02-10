
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import Button from '../../../inputs/Button';

import useGetQuery from '../../../../hooks/useGetQuery';

import Loading from '../../../common/Loading';

import { useReturnInvoiceContext } from '../../../../context/ReturnItemInvoice';
import { useReturnGoodsContext } from '../../../../context/ReturnGoods';

import DetailsItem from './DetailsItem';
import RecipientDetails from './RecipientDetails';

function ReturnGoodsContainer() {
  const router = useRouter();
  const { setInvoice } = useReturnGoodsContext();
  const { setForm } = useReturnInvoiceContext();
  const [formIndex, setFormIndex] = useState(0);

  const { data, status, error } = useGetQuery({
    service: "wallet-service/api/v1/",
    endpoint: 'escrows',
    extra: 'orders',
    queryKey: ['escrow', router?.query?.slug],
    param: router?.query?.slug,
    enabled: !!router?.query?.slug
  });

  useEffect(() => {
    if (status === 'success' && data?.data) {
      setInvoice(data.data);

      setForm((prev) => ({
        ...prev,
        disbursementType: 'onetime',
        recipientDetails: {
          ...prev.recipientDetails,
          name: data.data.recipientName
        },
        escrowId: data.data.id,
        amount: data.data.amount
      }));
    }
  }, [data, status]);

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
          iconPosition="left"
          icon={
            <HiOutlineArrowLeft className="mr-2 mb-0.5" />
          }
        >
          Back
        </Button>
      </div>

      {status === 'success' && (
        <div className="w-full">
          <div className="flex flex-wrap -m-4">
            <div className="w-full max-w-4xl p-4">
              <div className="w-full">
                <div>
                  <DetailsItem />
                  <div className="my-3" />
                  <RecipientDetails />
                </div>
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
}

export default ReturnGoodsContainer;
