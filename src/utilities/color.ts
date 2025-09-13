export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "draft":
      return {
        backgroundColor: "#FDF6B2",
        color: "#723B13",
        borderColor: "#FDF6B2",
      };
    case "paid":
    case "confirmed":
    case "completed":
      return {
        backgroundColor: "#DEF7EC",
        color: "#03543F",
        borderColor: "#DEF7EC",
      };
    case "processing":
    case "in-progress":
      return {
        backgroundColor: "#3b82f6",
        color: "#1e3a8a",
        borderColor: "#3b82f6",
      };
    case "cancelled":
    case "failed":
      return {
        backgroundColor: "#ef4444",
        color: "#991b1b",
        borderColor: "#ef4444",
      };
    default:
      return {
        backgroundColor: "#6b7280",
        color: "#374151",
        borderColor: "#6b7280",
      };
  }
};
