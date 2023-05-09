export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month.toLowerCase()}-${day}`;
};
