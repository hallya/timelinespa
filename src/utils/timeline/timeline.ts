import type { Month } from '../../types/dateTime';
import { averageDayCountPerWeek, maxMonthIndex, months } from "../constants";
import { dateTime, extractParts } from "../date";

export function generateTimelineMarkups(date: Date) {
  const startDateParts = dateTime({
    day: '2-digit',
    year: 'numeric',
  }).formatToParts(date);
  
  const [
    projectStartDay,
    year,
  ] = extractParts(startDateParts, ['day', 'year']);
  
  const monthIndex = date.getMonth();
  const weekIndex = Math.floor(Number(projectStartDay) / averageDayCountPerWeek);

  return {
    weekIndex: weekIndex === 4 ? 3 : weekIndex,
    monthIndex,
    year,
  };
}

export function generateYearsAndMonthList(startYear: number, endYear: number, startMonthIndex: number) {
  const yearsToDisplay: string[] = [];
  const monthsToDisplay: Month[][] = [];

  for (let year = startYear; year <= endYear; year++) {
    let monthsFromActualYear: Month[] = [];
    for (
      let monthIndex = monthsToDisplay.length ? 0 : startMonthIndex;
      monthIndex <= maxMonthIndex;
      monthIndex++
    ) {
      monthsFromActualYear.push(months[monthIndex]);
    }
    monthsToDisplay.push(monthsFromActualYear);
    yearsToDisplay.push(year.toString());
  }

  return {
    yearsToDisplay,
    monthsToDisplay,
  };
}
