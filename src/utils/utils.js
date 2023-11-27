function getFormattedDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = today.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDateAfterDays(daysToAdd) {
  const today = new Date();
  today.setDate(today.getDate() + daysToAdd);
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function convertToReadableFormat(formattedDate) {
    const year = formattedDate.substring(0, 4);
    const month = parseInt(formattedDate.substring(5, 7), 10);
    const day = parseInt(formattedDate.substring(8, 10), 10);
    // Create an array of month names
    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
  
    // Get the month name
    const monthName = monthNames[month - 1];
  
    // Format the date in "24 August, 2022" format
    const readableDate = `${day} ${monthName}, ${year}`;
  
    return readableDate;
  }

  export { getFormattedDate, getDateAfterDays, convertToReadableFormat };