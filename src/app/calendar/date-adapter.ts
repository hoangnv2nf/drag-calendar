import { Observable, Subject } from "rxjs";

export abstract class DateAdapter<D, L = any> {
    /** The locale to use for all dates. */
    protected locale!: L;
    protected readonly _localeChanges = new Subject<void>();

    /** A stream that emits when the locale changes. */
    readonly localeChanges: Observable<void> = this._localeChanges;
    /**
 * Sets the locale used for all dates.
 * @param locale The new locale.
 */
    setLocale(locale: L) {
        this.locale = locale;
        this._localeChanges.next();
    }
    /**
   * Gets the year component of the given date.
   * @param date The date to extract the year from.
   * @returns The year component.
   */
    abstract getYear(date: D): number;

    /**
     * Gets the month component of the given date.
     * @param date The date to extract the month from.
     * @returns The month component (0-indexed, 0 = January).
     */
    abstract getMonth(date: D): number;

    /**
     * Gets the date of the month component of the given date.
     * @param date The date to extract the date of the month from.
     * @returns The month component (1-indexed, 1 = first of month).
     */
    abstract getDate(date: D): number;

    /**
     * Gets the day of the week component of the given date.
     * @param date The date to extract the day of the week from.
     * @returns The month component (0-indexed, 0 = Sunday).
     */
    abstract getDayOfWeek(date: D): number;

    /**
     * Gets a list of names for the months.
     * @param style The naming style (e.g. long = 'January', short = 'Jan', narrow = 'J').
     * @returns An ordered list of all month names, starting with January.
     */
    abstract getMonthNames(style: 'long' | 'short' | 'narrow'): string[];

    /**
     * Gets a list of names for the dates of the month.
     * @returns An ordered list of all date of the month names, starting with '1'.
     */
    abstract getDateNames(): string[];

    /**
     * Gets a list of names for the days of the week.
     * @param style The naming style (e.g. long = 'Sunday', short = 'Sun', narrow = 'S').
     * @returns An ordered list of all weekday names, starting with Sunday.
     */
    abstract getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];

    /**
     * Gets the name for the year of the given date.
     * @param date The date to get the year name for.
     * @returns The name of the given year (e.g. '2017').
     */
    abstract getYearName(date: D): string;

    /**
     * Gets the first day of the week.
     * @returns The first day of the week (0-indexed, 0 = Sunday).
     */
    abstract getFirstDayOfWeek(): number;

    /**
     * Gets the number of days in the month of the given date.
     * @param date The date whose month should be checked.
     * @returns The number of days in the month of the given date.
     */
    abstract getNumDaysInMonth(date: D): number;
    /**
      * Creates a date with the given year, month, and date. Does not allow over/under-flow of the
      * month and date.
      * @param year The full year of the date. (e.g. 89 means the year 89, not the year 1989).
      * @param month The month of the date (0-indexed, 0 = January). Must be an integer 0 - 11.
      * @param date The date of month of the date. Must be an integer 1 - length of the given month.
      * @returns The new date, or null if invalid.
      */
    abstract createDate(year: number, month: number, date: number): D;

    /**
     * Gets today's date.
     * @returns Today's date.
     */
    abstract today(): D;
    /**
      * Adds the given number of years to the date. Years are counted as if flipping 12 pages on the
      * calendar for each year and then finding the closest date in the new month. For example when
      * adding 1 year to Feb 29, 2016, the resulting date will be Feb 28, 2017.
      * @param date The date to add years to.
      * @param years The number of years to add (may be negative).
      * @returns A new date equal to the given one with the specified number of years added.
      */
    abstract addCalendarYears(date: D, years: number): D;

    /**
     * Adds the given number of months to the date. Months are counted as if flipping a page on the
     * calendar for each month and then finding the closest date in the new month. For example when
     * adding 1 month to Jan 31, 2017, the resulting date will be Feb 28, 2017.
     * @param date The date to add months to.
     * @param months The number of months to add (may be negative).
     * @returns A new date equal to the given one with the specified number of months added.
     */
    abstract addCalendarMonths(date: D, months: number): D;

    /**
     * Adds the given number of days to the date. Days are counted as if moving one cell on the
     * calendar for each day.
     * @param date The date to add days to.
     * @param days The number of days to add (may be negative).
     * @returns A new date equal to the given one with the specified number of days added.
     */
    abstract addCalendarDays(date: D, days: number): D;
}