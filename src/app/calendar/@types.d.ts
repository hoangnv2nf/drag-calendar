
declare type TCalendarView = 'month' | 'year';

declare interface ICalendarConfig {
    parse: {
        dateInput: any;
    };
    display: {
        dateInput: any;
        monthLabel?: any;
        monthYearLabel: any;
        dateA11yLabel: any;
        monthYearA11yLabel: any;
    };
    firstDayOfWeek: number,
    locale: string
}