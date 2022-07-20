
import { Component, ViewEncapsulation, Inject, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { DayPilot } from "daypilot-pro-angular";


import { ProjectModel } from '../project.module';
import { ApiService } from '../shared/api.service';
import { Calendar, CalendarOptions, startOfDay,EventApi } from '@fullcalendar/angular'
import { HttpClientJsonpModule } from '@angular/common/http';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Observable,map, identity } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']

})
export class CalendarComponent implements OnInit{

  constructor(private api : ApiService) {}
   
  calendarVisible = true;
  calendarOptions:CalendarOptions={
    initialView:'dayGridMonth',
    events:[ {
      title:'',
      start:''
    }]
  }
  
 
  
 

  ngOnInit() {

    this.api.get().subscribe((res)=>{
      this.calendarOptions.events = res
      console.log(this.calendarOptions.events)
    })
   
}

    
  }

