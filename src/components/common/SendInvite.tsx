import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { HiLink, HiOutlineCheck } from 'react-icons/hi';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import handleFetch from '../../services/api/handleFetch';
import notification from '../../utilities/notification';
import Button from '../inputs/Button';
import TextInput from '../inputs/Text';

import Loading from './Loading';
import Modal from './Modal';

type Props = {
  onClose: () => void
};

function SendInvite({ onClose }: Props) {
  const [email, setEmail] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const sendInviteMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.message || `You have successfully sent an invite to ${email}`,
        type: 'success'
      });
      onClose();
    },
    onError: (err: any) => {
      notification({
        title: 'Error',
        message: err?.toString() || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

  const handleSendInvite = (e: any) => {
    e.preventDefault();

    if (!email) {
      notification({ title: 'Form Error', message: 'Please enter a valid email address', type: 'danger' });
      return;
    }

    sendInviteMutation.mutate({
      endpoint: 'user', extra: 'send-invite', method: 'POST', body: { email }, auth: true
    });
  };

  const { isLoading } = sendInviteMutation;

  return (
    <Modal isOpen onClose={onClose} isCenter maxWidth="max-w-[400px]">
      {isLoading && <Loading message="Sending invite..." />}

      <div className="w-full pb-3">
        <form className="w-full py-5" onSubmit={handleSendInvite}>
          <div className="mb-7">
            <h1 className="w-full text-textColor ff-bold text-xl mb-2">Invite</h1>
          </div>

          <div className="w-full flex space-x-3">
            <TextInput
              className="w-full"
              onChange={(e) => setEmail(e?.target?.value)}
              value={email || ''}
              type="email"
              placeholder="Enter email of the invitee"
            />

            <Button
              className="min-w-max"
              type="submit"
            >
              Send Invite
            </Button>
          </div>
        </form>
        <div className="w-full my-3 text-center relative">
          <hr />
          <p className="font-bold bg-white inline-block px-5 relative -top-2.5">or</p>
        </div>
        <div className="w-full">
          <CopyToClipboard
            text="https://bridgebyalat.ng?r=30303333"
            onCopy={() => setCopiedLink(true)}
          >
            <Button
              className="w-full text-lg font-bold !rounded-md"
              paddingY="p-3"
              bgColor="bg-primary"
            >
              {copiedLink
                ? <HiOutlineCheck className="w-7 h-auto mr-1" />
                : <HiLink className="w-6 h-auto mr-1" />}
              {copiedLink ? 'Link Copied' : 'Copy Link'}
            </Button>
          </CopyToClipboard>
        </div>
      </div>
    </Modal>
  );
}

export default SendInvite;
