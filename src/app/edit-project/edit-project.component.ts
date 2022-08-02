import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectModel } from '../project.module';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { resetFakeAsyncZone } from '@angular/core/testing';
import ClassicEditor  from '@ckeditor/ckeditor5-build-classic'

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  formValue !: FormGroup;
  actionBtn :string ="Edit";
  projectdata !: ProjectModel;
  public Editor = ClassicEditor;
  
 constructor(private dialog : MatDialog,private api :ApiService,private formbuilder:FormBuilder,private router:ActivatedRoute,private _router :Router) { }


  ngOnInit(): void {
     
    this.formValue = this.formbuilder.group({
      title :['',Validators.required],
      author :['',Validators.required],
      category :['',Validators.required],
      description :['',Validators.required],
      start :['',Validators.required],
      end :['',Validators.required],
      contributers :['',Validators.required],
      rating :['',Validators.required]
    
     })
   this.api.getCurrentData(this.router.snapshot.params['id']).subscribe((res)=>{ 
    this.formValue.patchValue(res);
   })
    
   
    
    
  }

  getAllProject(){

    this.api.get().subscribe(res=>{
      this.projectdata =res;
   })
  }
  updateProject(){
    
    this.api.put(this.formValue.value,this.router.snapshot.params['id']).subscribe((projects:ProjectModel[])=>{
      {alert("Project updated");
      this._router.navigate(['listproject']);
      this.formValue.reset();}}
    )
    
   }
  

 
}
