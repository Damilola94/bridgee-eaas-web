import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { VscChevronRight } from 'react-icons/vsc';

import { capitalize } from '../../utilities/general';

function BreadCrumbs() {
  const { asPath } = useRouter();

  const base = '/pfm';
  const hasQueries = asPath.indexOf('?');
  const path = asPath?.slice(0, hasQueries > 0 ? hasQueries : asPath.length)?.replace(base, '');

  return (
    <div className="flex items-center text-sm font-medium">
      {path?.split('/')?.map((item, i, arr) => item && (
        <span key={item} className="mr-1.5">
          {i < arr.length - 1 ? (
            <Link href={base + path?.slice(0, path?.indexOf(arr[i + 1]))}>
              <a className="flex items-center hover:underline">
                {capitalize(item)}
                <VscChevronRight className="ml-1.5" />
              </a>
            </Link>
          ) : (
            <span className="text-gray-400">{capitalize(item)}</span>
          )}
        </span>
      ))}

      {path === '' && <span className="text-gray-400">Analytics</span>}
    </div>
  );
}

export default BreadCrumbs;
