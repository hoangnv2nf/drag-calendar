import { InjectionToken } from "@angular/core";

export const NATIVE_CONFIG: ICalendarConfig = {
    parse: {
        dateInput: null,
    },
    display: {
        dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    },
    firstDayOfWeek: 1,
    locale: 'en-US'
};

export const CALENDAR_CONFIG = new InjectionToken<ICalendarConfig>('drag-calendar-config');