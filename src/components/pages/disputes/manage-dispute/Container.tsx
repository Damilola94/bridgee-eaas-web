
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import TransactionStatus from '../../../common/TransactionStatus';
import Button from '../../../inputs/Button';

import FormIndicator from './FormIndicator';
import OpenDispute from './OpenDispute';
import DisputeGuide from './DisputeGuide';
import DisputeActivities from './DisputeActivities';

import useGetQuery from '../../../../hooks/useGetQuery';
import Loading from '../../../common/Loading';
import { formatDateTime } from '../../../../utilities/dateTime';
import { formatCurrency } from '../../../../utilities/general';
import { useDisputeContext } from '../../../../context/Dispute';

function ManageDisputeContainer() {
  const router = useRouter();
  const { setDispute } = useDisputeContext();
  const [formIndex, setFormIndex] = useState(0);

  const { data, status, error } = useGetQuery({
    endpoint: 'escrow',
    queryKey: ['escrow-details', router?.query?.slug],
    param: router?.query?.slug,
    enabled: !!router?.query?.slug
  });

  useEffect(() => {
    if (status === 'success' && data?.data?.disputes?.[0]?.id) {
      setDispute(data?.data?.disputes?.[0]);
      if (data?.data?.disputes?.[0]?.status === 'Resolved') {
        setFormIndex(2);
      } else {
        setFormIndex(1);
      }
    }
  }, [status, data, setDispute]);

  return (
    <div className="w-full">
      <div className="w-full mb-3">
        <Button
          border
          onClick={() => router.back()}
          borderColor="border-primary"
          textColor="text-primary"
          bgColor="bg-transparent"
          paddingX="px-3"
        >
          <HiOutlineArrowLeft className="mr-2 mb-0.5" />
          Back
        </Button>
      </div>

      {status === 'loading' && <Loading />}

      {status === 'success' && (
        <div className="w-full">
          <div className="flex flex-wrap -m-4">
            <div className="w-full xl:w-7/12 p-4">
              <FormIndicator formIndex={formIndex} />

              <div className="w-full sm:flex justify-between bg-white px-10 py-8 rounded-lg shadow-md mb-5">
                <div>
                  <table className="text-[#888888]">
                    <tbody>
                      <tr>
                        <td className="py-1 pr-5">Invoice Number</td>
                        <td className="py-1">#{data?.data?.invoiceNumber}</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-5">Invoice Title</td>
                        <td className="py-1">{data?.data?.title}</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-5">Date Created</td>
                        <td className="py-1">{formatDateTime(data?.data?.createAt)}</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-5">Order Status</td>
                        <td className="py-1">
                          <TransactionStatus
                            status={data?.data?.status === 'paymentcompleted' ? data?.data?.deliveryStatus : data?.data?.status}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <table className="text-[#888888]">
                    <tbody>
                      <tr>
                        <td className="py-1 pr-5">Amount</td>
                        <td className="py-1 text-black font-bold">{formatCurrency(data?.data?.totalAmount)}</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-5">Inspection Period</td>
                        <td className="py-1">{data?.data?.inspectionDay} hour(s)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="w-full">
                {formIndex === 0 && <OpenDispute onNext={() => setFormIndex(1)} />}
                {formIndex === 1 && <DisputeActivities />}
                {formIndex === 2 && <DisputeActivities />}
              </div>
            </div>

            <div className="w-full xl:w-5/12 p-4">
              <DisputeGuide />
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="w-full py-10">
          {String(error)}
        </div>
      )}
    </div>
  );
}

export default ManageDisputeContainer;
