"use client";

import React from "react";

import Button from "../../../inputs/Button";
import { formatDate, getTime } from "../../../../utilities/dateTime";

import type { FinalDecisionCardProps } from "./type";

export default function FinalDecisionCard({
  adminName,
  decision,
  decidedAt,
  status,
  onInitiateReturn
}: FinalDecisionCardProps) {
  return (
    <div className="w-full bg-white px-8 py-6 rounded-lg shadow-md border border-gray-100 mt-3">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Final Decision
      </h2>

      <div className="border border-gray-400 rounded-lg px-6 py-5 mb-6 bg-gray-50">
        <p className="text-sm text-gray-700 mb-2">
          {adminName}:
        </p>

        <p className="text-sm italic text-gray-900 mb-4">
          “{decision}”
        </p>

        <p className="text-xs text-gray-500">
          {decidedAt ? ` ${formatDate(decidedAt)} | ${getTime(decidedAt)}` : "-"}
        </p>
      </div>

      {onInitiateReturn && (
        <Button
          disabled={status !== 'ReturnRequested'}
          onClick={onInitiateReturn}
          className="bg-success text-white font-semibold px-6 py-2 rounded-md hover:opacity-90"
        >
          Initiate Product Return Process
        </Button>
      )}
    </div>
  );
}
