import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragCalendarComponent } from './drag-calendar/drag-calendar.component';
import { RouterModule } from '@angular/router';
import { AdapterService } from './adapter.service';
import { NativeDateAdapter } from './native-date-adapter';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: DragCalendarComponent
    }
  ])],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }


@NgModule({
  declarations: [
    DragCalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule
  ],
  providers: [
    AdapterService,
    // NativeDateAdapter,
    {
      provide: NativeDateAdapter,
      useFactory: () => {
        const offset = new Date().getTimezoneOffset() * -1 / 60;
        console.log(offset);
        const adapter = new NativeDateAdapter();
        // adapter.setLocale('ja');
        adapter.setLocale('en-US');
        return adapter
      }
    }
  ]
})
export class CalendarModule { }
