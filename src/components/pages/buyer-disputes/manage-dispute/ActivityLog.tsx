// app/.../ActivityLog.tsx
"use client";

import React from "react";

import { formatDateTime } from "../../../../utilities/dateTime";
import NoData from "../../../common/NoData";

type ActivityItem = {
  timestamp?: string | null;
  action?: string;
  isChecked?: boolean;
};

export default function ActivityLog({ data = [] }: { data?: ActivityItem[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow-md">
        <div className="w-full px-10 py-8 border-b">
          <h3 className="font-bold text-xl ff-bold mb-5">Activities</h3>
          <NoData message="No activity yet" py="py-5" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="w-full px-10 py-8 border-b">
        <h3 className="font-bold text-xl ff-bold mb-5">Activities</h3>

        <div className="w-full">
          <ul>
            {data.map((item: ActivityItem, idx: number) => (
              <li
                key={`${idx}-${item?.timestamp ?? idx}`}
                className={`relative w-full px-5 pt-2 pb-5 border-l-2 ${
                  item.isChecked ? "border-primary" : "border-gray-300"
                } before:w-2.5 before:h-2.5 before:rounded-full before:absolute before:-left-1.5 before:top-[13px] ${
                  item.isChecked ? "before:bg-primary" : "before:bg-gray-300"
                }`}
              >
                <p className="text-lightText">{formatDateTime(item.timestamp ?? "")}</p>
                <p className="font-bold text-base">{item.action}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
