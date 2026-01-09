/**
 * Formats a date string from the transaction data.
 * - Returns "Yesterday" if the date is yesterday
 * - Returns weekday name if within last 7 days
 * - Returns MM/DD/YY format otherwise
 * 
 * @param dateString The date string from the transaction (can be "Yesterday", weekday, or MM/DD/YY format)
 * @returns Formatted date string
 */
export function formatTransactionDate(dateString: string): string {
  // If it's already a formatted relative date like "Yesterday", "Tuesday", etc., return as is
  if (!dateString || dateString === '') {
    return ''
  }

  // Check if it's already a relative date (Today, Yesterday, weekday)
  const relativeDates = ['Today', 'Yesterday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  if (relativeDates.includes(dateString)) {
    return dateString
  }

  // Try to parse MM/DD/YY or MM/DD/YYYY format
  const datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/
  const match = dateString.match(datePattern)
  
  if (!match) {
    // If it doesn't match expected format, return as is
    return dateString
  }

  const [, month, day, year] = match
  const fullYear = year.length === 2 ? `20${year}` : year
  
  // Create date object (month is 0-indexed in JS Date)
  const transactionDate = new Date(parseInt(fullYear), parseInt(month) - 1, parseInt(day))
  transactionDate.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Calculate days difference
  const daysDiff = Math.floor((today.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24))
  
  if (daysDiff === 0) {
    return 'Today'
  }
  
  if (daysDiff === 1) {
    return 'Yesterday'
  }
  
  if (daysDiff >= 0 && daysDiff < 7) {
    // Return weekday name
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return weekdays[transactionDate.getDay()]
  }
  
  // Return MM/DD/YY format
  const formattedMonth = month.padStart(2, '0')
  const formattedDay = day.padStart(2, '0')
  const formattedYear = year.length === 2 ? year : year.slice(-2)
  
  return `${formattedMonth}/${formattedDay}/${formattedYear}`
}
