export const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "success";
    case "in progress":
      return "warning";
    case "pending":
      return "default";
    default:
      return "info";
  }
};
