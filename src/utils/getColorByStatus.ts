export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "orange";
    case "processing":
      return "blue";
    case "completed":
      return "green";
    case "delivered":
      return "purple";
    case "cancelled":
      return "red";
    default:
      return "default";
  }
};

export const getPaymentStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return "green";
    case "pending":
      return "orange";
    case "unpaid":
      return "red";
    default:
      return "default";
  }
};

export const getSubscriptionStatusColor = (status?: string) => {
  switch (status!.toLowerCase()) {
    case "active":
      return "green";
    case "paused":
      return "orange";
    case "cancelled":
      return "red";
    case "completed":
      return "blue";
    default:
      return "default";
  }
};
