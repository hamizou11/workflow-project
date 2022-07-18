
import { Component, ViewEncapsulation, Inject, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { DayPilot } from "daypilot-pro-angular";


import { ProjectModel } from '../project.module';
import { ApiService } from '../shared/api.service';
import { Calendar, CalendarOptions, startOfDay } from '@fullcalendar/angular'
import { HttpClientJsonpModule } from '@angular/common/http';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Observable } from 'rxjs';
declare var moment: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']

})
export class CalendarComponent implements OnInit{
  

  
 
  project : ProjectModel=new ProjectModel();
  view :CalendarView =CalendarView.Month;
  viewDate :Date =new Date();
  events!: Observable<CalendarEvent<{project :ProjectModel }>[]>
 // calendarOptions!: CalendarOptions;
  //events !: CalendarEvent[];
  constructor(private api : ApiService){}
  handleDateClick(arg:any) {
    alert('date click! ' + arg.dateStr)
  }



 

  ngOnInit() {
    this.fetchEvents();
    
    
    
    
    
    /*this.api.get().subscribe(res=>{
      this.projects =JSON.parse(res)   ;
      console.log(this.projects)
   
     
       
      })
    
      /*setTimeout(()=>{
        return this.api.get().subscribe((res)=>{
          this.projects=res;
          console.log(this.projects.title);
        
         
       
          

        });
      },2000),
      setTimeout(()=>{
        this.calendarOptions ={
          initialView :'dayGridMonth',
          dateClick : this.handleDateClick.bind(this),
        events :[{title:'tttttyeaah',
          start:"2022-07-27T22:00:00.000Z"}]
         
        };
        
        
      },3000);
      console.log(this.projects);*/

   
  }
 


fetchEvents(): void{

  const getStart :any ={

   
  }
}









  
 /* project: ProjectModel = new ProjectModel();
  public srtView :View='Month';
  public setDate :Date =new Date();
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
   };*/
    
  }

