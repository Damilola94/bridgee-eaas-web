import Image from 'next/image';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import SuccessSvg from '../../../assets/svgs/success-tick.svg';
import ProfilePix from '../../../assets/svgs/personal-avatar.svg';
import BusinessPix from '../../../assets/svgs/business-avatar.svg';

import { useAccountsContext } from '../../../context/Accounts';
import handleFetch from '../../../services/api/handleFetch';
import notification from '../../../utilities/notification';
import Loading from '../../common/Loading';

import Modal from '../../common/Modal';
import Button from '../../inputs/Button';

type Props = {
  onClose: () => void,
};

function AcceptInvite({ onClose }: Props) {
  const router = useRouter();
  const { accounts } = useAccountsContext();
  const { user, merchants } = accounts || {};

  const [formIndex, setFormIndex] = useState(0);
  const [selectedId, setSelectedId] = useState('');

  const queryClient = useQueryClient();
  const acceptanceMutation = useMutation(handleFetch, {
    onSuccess: () => {
      queryClient.invalidateQueries(['escrow', router?.query?.slug]);
      setFormIndex(1);
    },
    onError: (err: any) => {
      notification({
        title: 'Error',
        message: err?.toString() || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

  const handleAccept = () => {
    if (!selectedId) {
      notification({
        title: 'Error',
        message: 'No account is selected.',
        type: 'danger'
      });
      return;
    }

    acceptanceMutation.mutate({
      endpoint: 'invitation',
      extra: 'accept-invitation',
      pQuery: { referenceNumber: router?.query?.reference, userOrMerchantId: selectedId },
      method: 'PUT',
      auth: true
    });
  };

  const { isLoading } = acceptanceMutation;

  return (
    <Modal isOpen onClose={onClose} maxWidth='max-w-[400px]'>
      {isLoading && <Loading />}

      {formIndex === 0 && (
        <div className="w-full py-5">
          <div className="mb-7">
            <h1 className="w-full text-textColor ff-bold text-xl pr-16">Which account are you accepting the invite with?</h1>
          </div>

          <div className="w-full mb-10">
            <div
              role="presentation"
              onClick={() => setSelectedId(user?.id)}
              className="w-full bg-secondary rounded-lg border px-5 py-2 mb-4 cursor-pointer"
            >
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Image
                    src={ProfilePix}
                    alt="user avater"
                    width={40}
                    height={40}
                    className="rounded-full mr-1 w-auto h-auto"
                  />
                  <div className="">
                    <h4 className="font-bold text-base mb-1">{`${user?.firstName} ${user?.lastName}`}</h4>
                    <h4 className="text-xs">Personal account</h4>
                  </div>
                </div>

                <span
                  className={`rounded-full inline-block ${selectedId === user?.id
                    ? 'bg-primary' : 'bg-gray-400'} p-1 w-5 h-5`}
                >
                  <FaCheck className="text-white w-3 h-3" />
                </span>
              </div>
            </div>

            {merchants?.map((item: any) => (
              <div
                key={item?.id}
                role="presentation"
                onClick={() => setSelectedId(item?.id)}
                className="w-full bg-secondary rounded-lg border px-5 py-2 mb-4 cursor-pointer"
              >
                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={BusinessPix}
                      alt="business avater"
                      width={40}
                      height={40}
                      className="rounded-full mr-1 w-auto h-auto"
                    />
                    <div className="">
                      <h4 className="font-bold text-base mb-1">{item?.name}</h4>
                      <h4 className="text-xs">Business account</h4>
                    </div>
                  </div>

                  <span
                    className={`rounded-full inline-block ${selectedId === item?.id
                      ? 'bg-primary' : 'bg-gray-400'} p-1 w-5 h-5`}
                  >
                    <FaCheck className="text-white w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleAccept}
            paddingX="px-10"
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
            paddingY="p-3.5"
          >
            Continue
          </Button>
        </div>
      )}

      {formIndex === 1 && (
        <div className="w-full py-5">
          <div className="mb-7">
            <h1 className="w-full pr-10 text-textColor ff-bold text-xl">Escrow invite accepted successfully.</h1>
            <h1 className="w-full pr-10 text-lightText text-base">You can proceed to make payment.</h1>
          </div>

          <div className="w-full mb-10">
            <Image src={SuccessSvg} alt="" className="mx-auto" />
          </div>

          <Button
            onClick={onClose}
            paddingX="px-10"
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
            paddingY="p-2.5"
          >
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
}

export default AcceptInvite;
