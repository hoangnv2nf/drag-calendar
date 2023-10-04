import { Component, OnInit } from '@angular/core';
import { DateAdapterBase } from '../date-adapter-base';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss']
})
export class MonthViewComponent implements OnInit {
  constructor(
    private _dateAdapter: DateAdapterBase<Date>
  ) {}
  ngOnInit(): void {
    
  }
  private _initWeekdays() {
    const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
    const narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
    const longWeekdays = this._dateAdapter.getDayOfWeekNames('long');

    // Rotate the labels for days of the week based on the configured first day of the week.
    let weekdays = longWeekdays.map((long, i) => {
      return {long, narrow: narrowWeekdays[i]};
    });
  }
}
