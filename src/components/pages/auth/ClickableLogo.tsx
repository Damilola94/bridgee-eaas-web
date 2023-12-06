import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '../../../assets/svgs/logos/full-pink.svg';

function ClickableLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`cursor-pointer inline-block ${className}`}>
      <Link href="/">
        <div className="">
          <Image src={Logo} alt="Bridge by ALAT logo" width={175} height={67} />
        </div>
      </Link>
    </div>
  );
}

export default ClickableLogo;
