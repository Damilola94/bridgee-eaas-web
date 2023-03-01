import { useRouter } from 'next/router';
import React from 'react';

type TabProps = { title: string, status: string };

function ListStatusTabs({ options = [] }: { options: TabProps[] }) {
  const router = useRouter();
  const { tab, status } = router.query || {};

  return (
    <div className="w-full overflow-auto hide-scroll mb-5">
      <ul className="inline-flex min-w-max rounded-md bg-white shadow">
        {options.map((item) => (
          <li className="" key={item?.title}>
            <button
              type="button"
              onClick={() => router.push({ pathname: '/transactions', query: { tab, status: item?.status } })}
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
