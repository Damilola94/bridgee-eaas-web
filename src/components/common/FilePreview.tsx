import React from 'react';
import Link from 'next/link';

import { FaFileImage } from 'react-icons/fa';

import { formatFileUrl } from '../../utilities/general';

function FilePreview({ file }: { file: { filename: string, filepath: string } }) {
  return (
    <div className="flex items-center mt-2">
      <p className="flex items-center">
        <FaFileImage className="w-5 h-5 mr-2" />
        {file.filename}
      </p>

      <Link
        href={formatFileUrl(file.filepath) || ''}
        target="_blank"
        className="text-sm text-success hover:underline ml-10"
      >
        View
      </Link>
    </div>
  );
}

export default FilePreview;
