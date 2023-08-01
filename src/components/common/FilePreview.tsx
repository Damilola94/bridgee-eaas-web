import React, { useState } from 'react';

import { formatFileUrl } from '../../utilities/general';
import Modal from './Modal';

function FilePreview({ file }: { file: any }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="flex items-center mt-2">
        <button
          type="button"
          className="underline flex text-sm text-blue-400 mr-3"
          onClick={() => setShow(true)}
        >
          {file.fileName}
        </button>
      </div>

      {show && (
        <Modal
          isOpen={show}
          onClose={() => setShow(false)}
        >
          <iframe
            title={file.fileName}
            src={`https://docs.google.com/gview?url=${formatFileUrl(file.documentPath)}&embedded=true`}
            className="w-full h-full"
            frameBorder="0"
          />
        </Modal>
      )}
    </>
  );
}

export default FilePreview;
