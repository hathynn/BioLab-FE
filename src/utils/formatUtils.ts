export const formatDate = (date?: Date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("vi-VN");
};

export const formatDateTime = (date?: Date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

export const formatCurrency = (amount?: number) => {
  if (amount === undefined) return "N/A";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
