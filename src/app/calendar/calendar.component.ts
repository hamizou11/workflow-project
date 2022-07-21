
import { Component, OnInit } from '@angular/core';

import { ProjectModel } from '../project.module';
import { ApiService } from '../shared/api.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, EventInput, isMultiDayRange } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { EdiCalendComponent } from '../edi-calend/edi-calend.component';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']

})
export class CalendarComponent implements OnInit{
  index:any;
  id:any;
  result :any;
  constructor(private api : ApiService,private router: ActivatedRoute,private dialog : MatDialog) {}
  calendarOptions!: CalendarOptions;
  ngOnInit() {
   this.api.get().subscribe((res:ProjectModel[])=>{
     this.result = res;
     // console.log(this.result);
       this.calendarOptions={
              events:this.result,
              eventClick: (arg) =>   {
                const index = this.result.findIndex((item:ProjectModel) => item.id === +arg.event.id);
                    //console.log(index);
                       this.dialog.open(EdiCalendComponent,{
                           data: this.result[index]
                       }).afterClosed().subscribe(val=>{ 
                        this.ngOnInit();
                   });     
              },
           }
    })  
}   

add(){
   this.dialog.open(AddProjectComponent,{
      }).afterClosed().subscribe(val=>{ 
            this.ngOnInit();
       })
     }
}

