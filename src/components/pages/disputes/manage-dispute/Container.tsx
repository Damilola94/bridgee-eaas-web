
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import TransactionStatus from '../../../common/TransactionStatus';
import NationalIdentification from '../../../../assets/images/national-identification.png';
import Button from '../../../inputs/Button';

import useGetQuery from '../../../../hooks/useGetQuery';
import Loading from '../../../common/Loading';
import { formatDateTime } from '../../../../utilities/dateTime';
// import { formatCurrency } from '../../../../utilities/general';
import { useDisputeContext } from '../../../../context/Dispute';

import DisputeActivities from './DisputeActivities';
import ActivityLog from './ActivityLog';

// import DisputeGuide from './DisputeGuide';
import OpenDispute from './OpenDispute';
import Dispute from './DisputeDet';

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
          iconPosition="left"
          icon={
            <HiOutlineArrowLeft className="mr-2 mb-0.5" />
          }
        >
          Back
        </Button>
      </div>

      {status === 'loading' && <Loading />}

      {status === 'error' && (
        <div className="w-full">
          <div className="flex flex-wrap -m-4">
            <div className="w-full xl:w-7/12 p-4">
              <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md mb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                  <table className="text-[#888888]">
                    <tbody>
                      <tr>
                        <td className="py-1 pr-5">Invoice Number</td>
                        <td className="py-1 font-semibold text-black">
                          {/* #{data?.data?.invoiceNumber} */}
                          #83JHW4
                        </td>
                      </tr>

                      <tr>
                        <td className="py-1 pr-5">Due Date</td>
                        <td className="py-1 font-semibold text-black">
                          {/* {formatDateTime(data?.data?.dueDate)}
                           */}
                          12/7/2023
                        </td>
                      </tr>

                      <tr>
                        <td className="py-1 pr-5">Dispute Status</td>
                        <td className="py-1">
                          {/* <TransactionStatus status={data?.data?.disputeStatus} /> */}
                          <TransactionStatus status={"Dispute In Progress"} />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="text-[#888888]">
                    <tbody>
                      <tr>
                        <td className="py-1 pr-5">Invoice Name</td>
                        <td className="py-1 font-semibold text-black">
                          {/* {data?.data?.title}
                           */}
                          Sneakers
                        </td>
                      </tr>

                      <tr>
                        <td className="py-1 pr-5">Amount</td>
                        <td className="py-1 font-bold text-black">
                          {/* {formatCurrency(data?.data?.totalAmount)} */}
                          NGN 64,000
                        </td>
                      </tr>

                      <tr>
                        <td className="py-1 pr-5">Date Sent</td>
                        <td className="py-1 font-semibold text-black">
                          {formatDateTime(data?.data?.createdAt)}
                          12/7/2023, 5:09 PM
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>

              <div className="w-full">
                <Dispute
                  userType="Buyer"
                  reason="“The product is not what i asked for, i asked for a bag and i got a shoe. i will provide evidences of our chat and a picture of the product that was delivered.”"
                  evidence={[
                    {
                      name: "National Identification.jpeg",
                      url: NationalIdentification
                    }
                  ]}
                  onAccept={() => {}}
                  onReject={() => {}}
                  onViewEvidence={() => {}}
                />
                {formIndex === 0 && <OpenDispute onNext={() => setFormIndex(1)} />}
                {formIndex === 1 && <DisputeActivities />}
                {formIndex === 2 && <DisputeActivities />}
              </div>
            </div>

            <div className="w-full xl:w-5/12 p-4">
              {/* <DisputeGuide /> */}
              <ActivityLog data={data?.data} />
            </div>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="w-full py-10">
          {String(error)}
        </div>
      )}
    </div>
  );
}

export default ManageDisputeContainer;
