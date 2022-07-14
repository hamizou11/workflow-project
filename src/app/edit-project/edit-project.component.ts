import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectModel } from '../project.module';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  formValue !: FormGroup;
  actionBtn :string ="Edit";
  projectdata !: any;
  
   
  constructor(private dialog : MatDialog,private api :ApiService,private formbuilder:FormBuilder,private router:ActivatedRoute,private _router :Router) { }


  ngOnInit(): void {
     
    this.formValue = this.formbuilder.group({
      title :['',Validators.required],
      author :['',Validators.required],
      description :['',Validators.required],
      startdate :['',Validators.required],
      enddate :['',Validators.required]
     })
   this.api.getCurrentData(this.router.snapshot.params['id']).subscribe((res)=>{ 
    this.formValue =new FormGroup({ 
      title:new FormControl(res['title']),
      author:new FormControl(res['author']),
      description:new FormControl(res['description']),
      startdate:new FormControl(res['startdate']),
      enddate:new FormControl(res['enddate']),
      contributers:new FormControl(res['contributers']),
      rating:new FormControl(res['rating'])
    })
   })
    
   
    
    
  }

  getAllProject(){

    this.api.get().subscribe(res=>{
      this.projectdata =res;
   })
  }
  UpdateProject(){
    
    this.api.put(this.formValue.value,this.router.snapshot.params['id']).subscribe({
      next:(res)=>{alert("Project updated");
      this._router.navigate(['listproject']);
      this.formValue.reset();}}
    )
    
   }

 
}
