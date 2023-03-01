import React from 'react';
import Image from 'next/image';

import EmptyList from '../../assets/svgs/no-data.svg';

function NoData({ message, py }: { message: string, py: string }) {
  return (
    <div className={`w-full h-full ${py} flex justify-center items-center`}>
      <div className="text-center">
        <Image src={EmptyList} alt="Icon" />
        <p className="text-xl ff-bold">{message}</p>
      </div>
    </div>
  );
}

NoData.defaultProps = {
  message: 'No Data',
  py: 'py-20'
};

export default NoData;
