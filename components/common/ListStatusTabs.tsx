import { useRouter } from 'next/router';
import React from 'react';

type TabProps = { title: string, status: string };

function ListStatusTabs({ options = [], pathname = '' }: { options: TabProps[], pathname: string }) {
  const router = useRouter();
  const { tab, status } = router.query || {};

  const tabQuery: any = {};
  if (tab) tabQuery.tab = tab;

  return (
    <div className="w-full overflow-auto hide-scroll mb-5">
      <ul className="inline-flex min-w-max rounded-md bg-white shadow-md">
        {options.map((item) => (
          <li className="" key={item?.title}>
            <button
              type="button"
              onClick={() => router.push({ pathname, query: { ...tabQuery, status: item?.status } })}
              className={`py-3 px-5 rounded-md font-semibold ${
                status === item?.status ? 'bg-primary text-white' : 'text-[#6B7280]'}`}
            >
              {item?.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListStatusTabs;
