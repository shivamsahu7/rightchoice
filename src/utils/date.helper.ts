export function formatDateInSql(date: any) {
  if (date) {
    const [day, month, year] = date.split('-');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
}