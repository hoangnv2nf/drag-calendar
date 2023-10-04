import { Inject, Injectable } from "@angular/core";
import { CALENDAR_CONFIG } from "./config";
import { DateAdapterBase } from "./date-adapter-base";
/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}

@Injectable()
export class DateAdapter extends DateAdapterBase<Date> {
    
    constructor(
        @Inject(CALENDAR_CONFIG) private config: ICalendarConfig
    ) {
        super();
        this.init()
    }
    private init() {
        const offset = new Date().getTimezoneOffset() * -1 / 60;
        if (Math.abs(offset) == 9) {
            this.setLocale('jp');
            return;
        }
        this.setLocale('en-US')
    }
    getYear(date: Date): number {
        return date.getFullYear();
    }

    getMonth(date: Date): number {
        return date.getMonth();
    }

    getDate(date: Date): number {
        return date.getDate();
    }

    getDayOfWeek(date: Date): number {
        return date.getDay();
    }

    getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        const dtf = new Intl.DateTimeFormat(this.locale, { month: style, timeZone: 'utc' });
        return range(12, i => this._format(dtf, new Date(2017, i, 1)));
    }

    getDateNames(): string[] {
        const dtf = new Intl.DateTimeFormat(this.locale, { day: 'numeric', timeZone: 'utc' });
        return range(31, i => this._format(dtf, new Date(2017, 0, i + 1)));
    }

    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        const dtf = new Intl.DateTimeFormat(this.locale, { weekday: style, timeZone: 'utc' });
        return range(7, i => this._format(dtf, new Date(2017, 0, i + 1)));
    }

    getYearName(date: Date): string {
        const dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric', timeZone: 'utc' });
        return this._format(dtf, date);
    }

    getFirstDayOfWeek(): number {
        return this.config.firstDayOfWeek ?? 0;
    }

    getNumDaysInMonth(date: Date): number {
        return this.getDate(
            this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0),
        );
    }

    clone(date: Date): Date {
        return new Date(date.getTime());
    }

    createDate(year: number, month: number, date: number): Date {
        let result = this._createDateWithOverflow(year, month, date);
        return result;
    }

    today(): Date {
        return new Date();
    }
    addCalendarYears(date: Date, years: number): Date {
        return this.addCalendarMonths(date, years * 12);
    }

    addCalendarMonths(date: Date, months: number): Date {
        let newDate = this._createDateWithOverflow(
            this.getYear(date),
            this.getMonth(date) + months,
            this.getDate(date),
        );

        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) != (((this.getMonth(date) + months) % 12) + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
        }

        return newDate;
    }

    addCalendarDays(date: Date, days: number): Date {
        return this._createDateWithOverflow(
            this.getYear(date),
            this.getMonth(date),
            this.getDate(date) + days,
        );
    }
    isValid(date: Date) {
        return !isNaN(date.getTime());
    }
    format(date: Date, displayFormat: Object): string {
        if (!this.isValid(date)) {
            throw Error('NativeDateAdapter: Cannot format invalid date.');
        }

        const dtf = new Intl.DateTimeFormat(this.locale, { ...displayFormat, timeZone: 'utc' });
        return this._format(dtf, date);
    }
    /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     * @param dtf Intl.DateTimeFormat object, containing the desired string format. It must have
     *    timeZone set to 'utc' to work fine.
     * @param date Date from which we want to get the string representation according to dtf
     * @returns A Date object with its UTC representation based on the passed in date info
     */
    private _format(dtf: Intl.DateTimeFormat, date: Date) {
        // Passing the year to the constructor causes year numbers <100 to be converted to 19xx.
        // To work around this we use `setUTCFullYear` and `setUTCHours` instead.
        const d = new Date();
        d.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        d.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        return dtf.format(d);
    }
    /** Creates a date but allows the month and date to overflow. */
    private _createDateWithOverflow(year: number, month: number, date: number) {
        // Passing the year to the constructor causes year numbers <100 to be converted to 19xx.
        // To work around this we use `setFullYear` and `setHours` instead.
        const d = new Date();
        d.setFullYear(year, month, date);
        d.setHours(0, 0, 0, 0);
        return d;
    }
}