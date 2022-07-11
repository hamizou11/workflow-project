
import { Component, ViewEncapsulation, Inject, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { EventSettingsModel,View, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';

import { ProjectModel } from '../project.module';
declare var moment: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
})
export class CalendarComponent {
  

  project: ProjectModel = new ProjectModel();
  public srtView :View='Month';
  public setDate :Date =new Date(2018, 1, 15);
  private eventObject : EventSettingsModel = {  
    dataSource :[{ 
      subject : this.project.title, 
      StartTime: new Date(this.project.startdate),
      EndTime: new Date(this.project.enddate)
     }],
       fields:{
         subject:{ name:'subject' },
         startTime :{  name :'StartTime'},
         endTime :{ name:'EndTime' }
           }
   };
    
  }

