import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '../../../assets/svgs/logo.svg';

function ClickableLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`cursor-pointer inline-block ${className}`}>
      <Link href='/'>
        <div className="flex items-center space-x-5">
          <div>
            <Image src={Logo} alt="ALAT Logo" layout="fixed" width={70} height={78} />
          </div>
          <h1 className="font-bold text-2xl">Bridge by ALAT</h1>
        </div>
      </Link>
    </div>
  );
};

export default ClickableLogo;
