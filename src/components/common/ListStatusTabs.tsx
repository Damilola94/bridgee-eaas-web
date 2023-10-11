import { useRouter } from 'next/router';
import React from 'react';

type TabProps = { title: string, status: string };

function ListStatusTabs({ options = [], pathname = '' }: { options: TabProps[], pathname: string }) {
  const router = useRouter();
  const { tab, status } = router.query || {};

  const tabQuery: any = {};
  if (tab) tabQuery.tab = tab;

  return (
    <div className="w-full overflow-auto bg-white hide-scroll mb-5 border-b rounded-t-lg">
      <ul className="inline-flex min-w-max">
        {options.map((item) => (
          <li className="" key={item?.title}>
            <button
              type="button"
              onClick={() => router.push({ pathname, query: { ...tabQuery, status: item?.status } })}
              className={`py-3 px-5 text-base font-semibold ${
                status === item?.status ? 'border-b-[3px] border-primary text-primary' : 'text-[#91979D]'}`}
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
