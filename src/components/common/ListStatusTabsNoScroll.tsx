/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type TabProps = { title: string; status: string };

function ListStatusTabsNoScroll({
  options = [],
  pathname = ""
}: {
  options: TabProps[];
  pathname: string;
}) {
  const router = useRouter();
  const { tab, status } = router.query || {};

  const tabQuery: any = {};
  if (tab) tabQuery.tab = tab;

  useEffect(() => {
    if (!status && options.length > 0) {
      router.replace(
        { pathname, query: { ...tabQuery, status: "all" } },
        undefined,
        { scroll: false }
      );
    }
  }, [status, options, pathname, router, tabQuery]);

  return (
    <div className="w-full overflow-auto bg-white hide-scroll mb-5 border-b rounded-t-lg">
      <ul className="inline-flex min-w-max">
        {options.map((item) => (
          <li key={item?.title}>
            <button
              type="button"
              onClick={() =>
                router.push(
                  { pathname, query: { ...tabQuery, status: item?.status } },
                  undefined,
                  { scroll: false }
                )
              }
              className={`py-3 px-5 text-base font-semibold ${
                status === item?.status
                  ? "border-b-[3px] border-primary text-primary"
                  : "text-[#91979D]"
              }`}
            >
              {item?.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListStatusTabsNoScroll;
