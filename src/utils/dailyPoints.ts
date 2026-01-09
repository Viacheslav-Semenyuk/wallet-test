/**
 * Determines the current season and calculates the day index within that season.
 * Seasons are defined as quarters:
 * - Q1: January 1 - March 31
 * - Q2: April 1 - June 30
 * - Q3: July 1 - September 30
 * - Q4: October 1 - December 31
 * 
 * @returns An object with season number (1-4) and day index (1-based)
 */
export function getSeasonAndDayIndex(date: Date = new Date()): { season: number; dayIndex: number } {
  const year = date.getFullYear()
  const month = date.getMonth() // 0-11
  
  // Determine season (quarter)
  let season: number
  let seasonStartDate: Date
  
  if (month >= 0 && month <= 2) {
    // Q1: January (0) - March (2)
    season = 1
    seasonStartDate = new Date(year, 0, 1) // January 1
  } else if (month >= 3 && month <= 5) {
    // Q2: April (3) - June (5)
    season = 2
    seasonStartDate = new Date(year, 3, 1) // April 1
  } else if (month >= 6 && month <= 8) {
    // Q3: July (6) - September (8)
    season = 3
    seasonStartDate = new Date(year, 6, 1) // July 1
  } else {
    // Q4: October (9) - December (11)
    season = 4
    seasonStartDate = new Date(year, 9, 1) // October 1
  }
  
  // Calculate day index (1-based) within the season
  const timeDiff = date.getTime() - seasonStartDate.getTime()
  const dayIndex = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1
  
  return { season, dayIndex }
}

/**
 * Calculates daily points based on the day index using the formula:
 * - Day 1 = 2 points
 * - Day 2 = 3 points
 * - Day N >= 3: points = round(points[N-2] + points[N-1] * 0.6)
 * 
 * @param dayIndex The day index within the season (1-based)
 * @returns The calculated points for that day
 */
export function calculateDailyPoints(dayIndex: number): number {
  if (dayIndex < 1) {
    return 0
  }
  
  if (dayIndex === 1) {
    return 2
  }
  
  if (dayIndex === 2) {
    return 3
  }
  
  // For day N >= 3, we need to calculate recursively
  // Using dynamic programming to calculate efficiently
  const points: number[] = [0, 2, 3] // Index 0 unused, Day 1 = 2, Day 2 = 3
  
  for (let n = 3; n <= dayIndex; n++) {
    const previousPoints = points[n - 1]
    const twoDaysAgoPoints = points[n - 2]
    const calculatedPoints = twoDaysAgoPoints + previousPoints * 0.6
    points[n] = Math.round(calculatedPoints)
  }
  
  return points[dayIndex]
}

/**
 * Formats points for display:
 * - If points >= 1000, displays in K format (e.g., 456000 → "456K")
 * - Otherwise, displays as plain number
 * 
 * @param points The points value to format
 * @returns Formatted string representation
 */
export function formatPoints(points: number): string {
  if (points >= 1000) {
    return `${Math.round(points / 1000)}k`
  }
  return points.toString()
}

/**
 * Gets the current daily points based on the current date.
 * Determines the season, calculates the day index, and computes the points.
 * 
 * @param date Optional date to use (defaults to current date)
 * @returns Formatted points string (e.g., "456K" or "123")
 */
export function getDailyPoints(date: Date = new Date()): string {
  const { dayIndex } = getSeasonAndDayIndex(date)
  const points = calculateDailyPoints(dayIndex)
  return formatPoints(points)
}

/**
 * Gets the raw daily points value (not formatted).
 * 
 * @param date Optional date to use (defaults to current date)
 * @returns Raw points number
 */
export function getDailyPointsRaw(date: Date = new Date()): number {
  const { dayIndex } = getSeasonAndDayIndex(date)
  return calculateDailyPoints(dayIndex)
}
