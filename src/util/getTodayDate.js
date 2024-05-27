// Util function to get current date in 'YYYY-MM-DD' format
export function getDateToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns zero-based month
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
