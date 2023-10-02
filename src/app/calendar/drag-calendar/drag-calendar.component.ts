import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NativeDateAdapter } from '../native-date-adapter';

@Component({
  selector: 'app-drag-calendar',
  templateUrl: './drag-calendar.component.html',
  styleUrls: ['./drag-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragCalendarComponent implements OnInit {
  dateAdapter = inject(NativeDateAdapter);
  monthsName: string[] = [];
  dayOfWeekNames: string[] = [];
  firstdayofweek = this.dateAdapter.getFirstDayOfWeek();
  ngOnInit() {
    this.monthsName = this.dateAdapter.getMonthNames('narrow');
    this.dayOfWeekNames = this.dateAdapter.getDayOfWeekNames('narrow')
  }
}
