import { useRouter } from 'next/router';
import React from 'react';

import { useAccountsContext } from '../../../context/Accounts';

type TabProps = { title: string, tab: string };

function Tabs({ options = [], pathname = '' }: { options: TabProps[], pathname: string }) {
  const { accounts } = useAccountsContext();
  const router = useRouter();
  const { tab } = router.query || {};

  return (
    <div className="w-full overflow-auto bg-white hide-scroll mb-5 border-b rounded-t-lg">
      <ul className="inline-flex min-w-max">
        {options.map((item) => {
          if (!accounts?.defaultMerchant && item?.tab === 'business-details') return null;
          return (
            <li className="" key={item?.title}>
              <button
                type="button"
                onClick={() => router.push({ pathname, query: { tab: item?.tab } })}
                className={`py-3 px-5 text-base font-semibold ${
                  tab === item?.tab ? 'border-b-[3px] border-primary text-primary' : 'text-[#91979D]'}`}
              >
                {item?.title}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Tabs;
