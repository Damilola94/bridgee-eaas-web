
import { useState } from 'react';
import { useRouter } from 'next/router';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import TransactionStatus from '../../../common/TransactionStatus';
import Button from '../../../inputs/Button';

import FormIndicator from './FormIndicator';
import OpenDispute from './OpenDispute';
import DisputeGuide from './DisputeGuide';
import DisputeProgress from './DisputeProgress';

import useGetQuery from '../../../../hooks/useGetQuery';
import Loading from '../../../common/Loading';
import { formatDateTime } from '../../../../utilities/dateTime';
import { formatCurrency } from '../../../../utilities/general';

function ManageDisputeContainer() {
  const router = useRouter();
  const [formIndex, setFormIndex] = useState(0);

  const { data, status, error } = useGetQuery({
    endpoint: 'escrow',
    queryKey: ['escrow', router?.query?.slug],
    param: router?.query?.slug,
    enabled: !!router?.query?.slug
  });

  // "data": {
  //   "sellerDetails": {
  //       "name": "Robert Eru",
  //       "address": "N/A",
  //       "pictPath": "https://bridge-alat.netlify.app/_next/static/media/logo.06df0a0f.svg"
  //   },
  //   "escrowId": "7114cceb-9cec-4e00-bf8f-884010c10ea4",
  //   "title": "Mac Product",
  //   "invoiceNumber": "6984348",
  //   "totalAmount": 100000.00,
  //   "amountPaid": 100000.00,
  //   "fee": 0,
  //   "deliveryFee": 0,
  //   "recipientDetails": {
  //       "address": "River road abraka",
  //       "name": "Chuknonso",
  //       "phoneNumber": "08162487592",
  //       "email": "chuksjoe@live.com"
  //   },
  //   "items": [
  //       {
  //           "name": "Aipod",
  //           "quantity": 1,
  //           "weight": 2,
  //           "unitPrice": 100000.00,
  //           "totalAmount": 100000.00
  //       }
  //   ],
  //   "activities": [
  //       {
  //           "title": "Order accepted",
  //           "datetime": "2023-06-16T05:49:42.2233333"
  //       }
  //   ],
  //   "dueDate": null,
  //   "totalItemWeight": 2,
  //   "inspectionDay": 7,
  //   "disbursementType": "onetime",
  //   "status": "completed",
  //   "agreementWrittenTerms": "<p>I dont  refund</p>",
  //   "agreemmentDocPath": "",
  //   "createAt": "2023-06-16T05:47:33.9233333",
  //   "updatedAt": "0001-01-01T00:00:00",
  //   "deliveryStatus": "Delivered",
  //   "isSeller": false
  // }

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

              <div className="w-full flex justify-between bg-white px-10 py-8 rounded-lg shadow-md mb-5">
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
                          <TransactionStatus status={data?.data?.status} />
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
                {formIndex === 1 && <DisputeProgress onNext={() => setFormIndex(2)} />}
                {formIndex === 2 && <DisputeProgress onNext={() => setFormIndex(2)} />}
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
