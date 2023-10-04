import { Component, forwardRef, Inject } from '@angular/core';
import { DateAdapterBase } from '../date-adapter-base';
import { DragCalendar } from '../drag-calendar/drag-calendar.component';
import { CALENDAR_CONFIG } from '../config';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeader {
  constructor(
    @Inject(forwardRef(() => DragCalendar)) public dragCalendar: DragCalendar,
    private dateAdapter: DateAdapterBase<Date>,
    @Inject(CALENDAR_CONFIG) private format: ICalendarConfig
  ) {}

  get periodButtonText(): string {
    if (this.dragCalendar.currentView == 'month') {
      return this.dateAdapter.format(this.dragCalendar.activeDate, this.format.display.monthYearLabel).toLocaleUpperCase()
    }
    return ''
  }
}
