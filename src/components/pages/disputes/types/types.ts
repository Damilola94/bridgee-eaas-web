export type DisputeStatus = "ongoing" | "resolved" | "all";

export type DsputeTimelineEvent = {
  id: string;
  label: string;
  date: string;
  state: "success" | "error" | "pending";
};
