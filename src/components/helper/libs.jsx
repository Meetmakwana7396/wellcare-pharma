export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const day = String(date.getDate()).padStart(2, "0");

  return `${year} - ${month.toLowerCase()} - ${day}`;
};

export const toIndianCurrency = (price) => {
  const formattedPrice = price
    .replace(/[^0-9.]/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `₹${formattedPrice}`;
};
export const statusMap = [
  { key: "1", value: "pending" },
  { key: "2", value: "packed" },
  { key: "3", value: "shipped" },
  { key: "4", value: "delivered" },
];

export function getOrderStatus(key) {
  const statusObject = statusMap.find((status) => status.key == key);
  return statusObject ? statusObject.value : null;
}
