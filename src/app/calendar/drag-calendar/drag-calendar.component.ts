import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DateAdapter } from '../date-adapter.service';

@Component({
  selector: 'app-drag-calendar',
  templateUrl: './drag-calendar.component.html',
  styleUrls: ['./drag-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragCalendar implements OnInit {
  dateAdapter = inject(DateAdapter);
  currentView: TCalendarView = 'month';
  activeDate: Date = new Date();
  ngOnInit() {
  }
}
