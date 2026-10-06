/**
 * Date Engine
 * Handles date resolution, comparison, and milestone calculations for digital signage.
 * Strictly uses local system dates or user-configured test dates (zero timezone drift).
 */

export interface ActiveDateInfo {
  date: Date;
  isoDateString: string; // "YYYY-MM-DD"
  monthDay: string; // "MM-DD"
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  formattedDisplay: string; // "Saturday, 03 October 2026"
  formattedHindiDate: string; // "03 अक्टूबर 2026"
  isTestDate: boolean;
}

const HINDI_MONTHS = [
  'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
  'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
];

/**
 * Resolves current active date based on test date or system clock
 */
export function getActiveDate(testDateString: string | null = null): ActiveDateInfo {
  let targetDate: Date;

  if (testDateString && testDateString.trim() !== '') {
    // Parse "YYYY-MM-DD" manually to prevent UTC timezone shifts
    const parts = testDateString.trim().split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      targetDate = new Date(year, monthIndex, day, 12, 0, 0);
    } else {
      targetDate = new Date();
    }
  } else {
    targetDate = new Date();
  }

  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const isoDateString = `${year}-${mm}-${dd}`;
  const monthDay = `${mm}-${dd}`;

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  };
  const formattedDisplay = targetDate.toLocaleDateString('en-IN', options);
  const formattedHindiDate = `${dd} ${HINDI_MONTHS[month - 1]} ${year}`;

  return {
    date: targetDate,
    isoDateString,
    monthDay,
    year,
    month,
    day,
    formattedDisplay,
    formattedHindiDate,
    isTestDate: Boolean(testDateString && testDateString.trim() !== '')
  };
}

/**
 * Checks if a recurring date (e.g. Birthday, Anniversary) matches today (by MM-DD)
 */
export function isRecurringMatch(dateStr: string | null | undefined, todayMonthDay: string): boolean {
  if (!dateStr) return false;
  const clean = dateStr.trim();
  if (clean.length === 5) {
    // Already "MM-DD"
    return clean === todayMonthDay;
  }
  if (clean.length >= 10) {
    // "YYYY-MM-DD"
    const mmdd = clean.substring(5, 10);
    return mmdd === todayMonthDay;
  }
  return false;
}

/**
 * Checks if a specific one-time date (e.g. Promotion, Retirement) matches today (by YYYY-MM-DD)
 */
export function isExactDateMatch(dateStr: string | null | undefined, todayIsoDate: string): boolean {
  if (!dateStr) return false;
  return dateStr.trim().substring(0, 10) === todayIsoDate;
}

/**
 * Calculates completed years from a base date
 */
export function calculateCompletedYears(baseDateStr: string | null | undefined, currentYear: number): number {
  if (!baseDateStr) return 0;
  const clean = baseDateStr.trim();
  const baseYear = parseInt(clean.substring(0, 4), 10);
  if (isNaN(baseYear)) return 0;
  const diff = currentYear - baseYear;
  return Math.max(0, diff);
}

/**
 * Returns ordinal string, e.g. 11 -> "11th", 21 -> "21st"
 */
export function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
