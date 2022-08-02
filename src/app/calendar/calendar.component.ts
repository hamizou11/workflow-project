
import { Component, OnInit } from '@angular/core'
import { ProjectModel } from '../project.module';
import { ApiService } from '../shared/api.service';
import { CalendarOptions, EventInput, isMultiDayRange } from '@fullcalendar/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { EdiCalendComponent } from '../edi-calend/edi-calend.component';
import { Observable, Subscriber,from, of, fromEvent, filter, map, concatMap, tap, catchError, EMPTY } from 'rxjs';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']

})
export class CalendarComponent implements OnInit{
  index:any;
  formValue !: FormGroup;
  id:any;
  result :any;
  start:any;
  private input!:FormControl;
  project:ProjectModel[]=[];
  constructor(private api : ApiService,private router: ActivatedRoute,private dialog : MatDialog, private formBuilder : FormBuilder) {}
  calendarOptions!: CalendarOptions;
  ngOnInit() {
    this.formValue = this.formBuilder.group({
    input :this.input
    
  })
   this.api.get().subscribe((res:ProjectModel[])=>{
     this.result = res;
     // console.log(this.result);
       this.calendarOptions={
              editable:true,
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
              eventDrop(arg) {
                
               alert(
                 arg.event.title + " was moved "+
                 arg.event.start + "was moved"
              );
              if (!confirm("Are you sure about this change?")) {
            }
            console.log(arg.event.start);
      
              },
           }
          
    })  
   this.api.get().pipe(concatMap(project=>project),filter((project:any)=>project.title ==='hamza')).subscribe((item)=>{
      
      console.log(item)
    });
    
}   

add(){
   this.dialog.open(AddProjectComponent,{
      }).afterClosed().subscribe(val=>{ 
            this.ngOnInit();
       })
     }
  search(){
   // console.log( this.formValue.get('input')?.value);
    from(this.api.get()).pipe(
    catchError(()=>EMPTY),
    map(project=>project.
    filter((project:any)=>project.category===this.formValue.get('input')?.value))).subscribe((item:ProjectModel[])=>{
    this.result= item;
    this.calendarOptions={
      editable:true,
      events:this.result,
      }

      console.log(item)
    });

     }
   
    }
   

