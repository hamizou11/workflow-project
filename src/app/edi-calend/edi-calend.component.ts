import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectModel } from '../project.module';
import { ApiService } from '../shared/api.service';
import ClassicEditor  from '@ckeditor/ckeditor5-build-classic'

@Component({
  selector: 'app-edi-calend',
  templateUrl: './edi-calend.component.html',
  styleUrls: ['./edi-calend.component.css']
})
export class EdiCalendComponent implements OnInit {
  
  formValue !: FormGroup;
  actionBtn :string ="Edit";
  projectdata !: any;
  public Editor = ClassicEditor;

  constructor(private dialog : MatDialog,private api :ApiService,private formbuilder:FormBuilder,
    private dialogRef :MatDialogRef<EdiCalendComponent>
        ,@Inject (MAT_DIALOG_DATA) public editData :any ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      title :['',Validators.required],
      author :['',Validators.required],
      category :['',Validators.required],
      description :['',Validators.required],
      start :['',Validators.required],
      end :['',Validators.required],
      contributers :['',Validators.required],
      rating: ['', Validators.required]
    });
    console.log( this.editData);
    if(this.editData)  {
      this.actionBtn="Update";
      this.formValue.patchValue(this.editData);
    }
  }
  addProject(){ 
    if(!this.editData){if(this.formValue.valid){ } 
  }else{this.updateProject() }
  
  }

  updateProject(){
    this.api.put(this.formValue.value,this.editData.id)
    .subscribe((projects:ProjectModel[])=>{
      
      {alert("Project updated");
      this.dialogRef.close('Updated')
      this.formValue.reset();}}
    )
  }


}
