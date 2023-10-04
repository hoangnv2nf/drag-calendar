import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragCalendar } from './drag-calendar/drag-calendar.component';
import { RouterModule } from '@angular/router';
import { AdapterService } from './adapter.service';
import { MonthViewComponent } from './month-view/month-view.component';
import { CalendarHeader } from './calendar-header/calendar-header.component';
import { CALENDAR_CONFIG, NATIVE_CONFIG } from './config';
import { DateAdapter } from './date-adapter.service';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: DragCalendar
    }
  ])],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }


@NgModule({
  declarations: [
    MonthViewComponent,
    CalendarHeader,
    DragCalendar
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule
  ],
  providers: [
    AdapterService,
    DateAdapter,
    {
      provide: CALENDAR_CONFIG,
      useValue: NATIVE_CONFIG
    }
  ]
})
export class CalendarModule { 
  static forFeature(config: Partial<ICalendarConfig>): ModuleWithProviders<CalendarModule> {
    const _config: ICalendarConfig = {...NATIVE_CONFIG, ...config};
    return {
      ngModule: CalendarModule,
      providers: [
        AdapterService,
        {
          provide: CALENDAR_CONFIG,
          useValue: {...NATIVE_CONFIG, ...config}
        },
        {
          provide: DateAdapter,
          useFactory: () => {
            return new DateAdapter(_config);
          }
        }
      ]
    }
  }
}
