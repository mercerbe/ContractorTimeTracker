export const formatDollar = value => {
  return value || value === 0
    ? "$" +
        Number(value)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";
};
