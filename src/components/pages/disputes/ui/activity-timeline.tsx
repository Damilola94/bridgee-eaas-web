import { Check, X as XIcon, Circle } from "lucide-react";
import moment from "moment";
import { DsputeTimelineEvent } from "../types/types";

function TimelineIcon({ state }: { state: "success" | "error" | "pending" }) {
  if (state === "success") {
    return (
      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
        <Check className="h-3 w-3 text-white" strokeWidth={3} />
      </div>
    );
  }
  if (state === "error") {
    return (
      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center shrink-0">
        <XIcon className="h-3 w-3 text-white" strokeWidth={3} />
      </div>
    );
  }
  return (
    <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
      <Circle className="h-2 w-2 text-white fill-white" />
    </div>
  );
}

export function ActivityTimeline({
  events,
}: {
  events: DsputeTimelineEvent[];
}) {
  return (
    <div className="space-y-2">
      <span className="inline-block bg-white border border-gray-200 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md">
        Activity Timeline
      </span>

      <div className="bg-gray-50 rounded-xl p-4">
        {events.map((event, index) => (
          <div key={event.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <TimelineIcon state={event.state} />
              {index < events.length - 1 && (
                <div className="w-px flex-1 bg-gray-300 my-1" />
              )}
            </div>
            <div className="pb-4">
              <p className="text-xs text-gray-400 mb-0.5">
                {moment(event.date).format("MMMM D, YYYY; h:mma")}
              </p>
              <p className="text-sm font-medium text-gray-900">
                {event.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}