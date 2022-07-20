
import { Component, OnInit } from '@angular/core';

import { ProjectModel } from '../project.module';
import { ApiService } from '../shared/api.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, EventInput, isMultiDayRange } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']

})
export class CalendarComponent implements OnInit{

  result :any;
  constructor(private api : ApiService,private http:HttpClient) {}
  calendarOptions!: CalendarOptions
  calendarEvents!: EventInput[];

  ngOnInit() {
   this.api.get().subscribe((res)=>{
      this.result = res;
          this.calendarOptions={
              events:this.result}   
    })  
}   
}

