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

export const getOrderStatus = (id) => {
  const statusMap = {
    1: "pending",
    2: "packed",
    3: "shipped",
    4: "delivered",
  };

  return statusMap[id] || "";
};
