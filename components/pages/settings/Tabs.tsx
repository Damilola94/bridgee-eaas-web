import { useRouter } from 'next/router';
import React from 'react';

type TabProps = { title: string, tab: string };

function Tabs({ options = [], pathname = '' }: { options: TabProps[], pathname: string }) {
  const router = useRouter();
  const { tab } = router.query || {};

  return (
    <div className="w-full overflow-auto hide-scroll mb-7">
      <ul className="inline-flex min-w-max rounded-md bg-white shadow-md">
        {options.map((item) => (
          <li className="" key={item?.title}>
            <button
              type="button"
              onClick={() => router.push({ pathname, query: { tab: item?.tab } })}
              className={`py-3 px-5 rounded-md font-semibold ${
                tab === item?.tab ? 'bg-primary text-white' : 'text-[#6B7280]'}`}
            >
              {item?.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tabs;
