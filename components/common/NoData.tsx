import React from 'react';
import Image from 'next/image';

import EmptyList from '../../assets/svgs/no-data.svg';

function NoData({ message, py, sm = false }: { message: string, py: string, sm?: boolean }) {
  return (
    <div className={`w-full h-full ${py} flex justify-center items-center`}>
      <div className="text-center">
        <div className="inline-block">
          <Image src={EmptyList} alt="Icon" className={sm ? 'w-20 h-auto' : ''} />
        </div>
        <p className={`${sm ? 'text-sm' : 'text-xl'} ff-bold`}>{message}</p>
      </div>
    </div>
  );
}

NoData.defaultProps = {
  message: 'No Data',
  py: 'py-20'
};

export default NoData;
