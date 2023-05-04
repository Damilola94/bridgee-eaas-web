import React from 'react';
import { Interweave } from 'interweave';

import { formatFileUrl } from '../../../utilities/general';
import Modal from '../../common/Modal';

type Props = {
  onClose: () => void;
  text?: string;
  file?: string;
};

function ViewAgreement({ onClose, text, file }: Props) {
  return (
    <Modal isOpen onClose={onClose} maxWidth='max-w-[700px]'>
      <div className="w-full py-5">
        <h2 className="w-full text-textColor ff-bold text-xl mb-5">Escrow Agreement</h2>

        {text && (
          <div className="">
            <Interweave className="leading-loose" content={text} />
          </div>
        )}

        {file && (
          <iframe
            title="Escrow Agreement"
            src={`https://docs.google.com/gview?url=${formatFileUrl(file || '')}&embedded=true`}
            className="w-full h-full"
            frameBorder="0"
          />
        )}
      </div>
    </Modal>
  );
}

export default ViewAgreement;
