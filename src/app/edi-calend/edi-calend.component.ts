import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectModel } from '../project.module';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-edi-calend',
  templateUrl: './edi-calend.component.html',
  styleUrls: ['./edi-calend.component.css']
})
export class EdiCalendComponent implements OnInit {
  
  formValue !: FormGroup;
  actionBtn :string ="Edit";
  projectdata !: any;

  constructor(private dialog : MatDialog,private api :ApiService,private formbuilder:FormBuilder,
    private dialogRef :MatDialogRef<EdiCalendComponent>
        ,@Inject (MAT_DIALOG_DATA) public editData :any ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      title :['',Validators.required],
      author :['',Validators.required],
      description :['',Validators.required],
      start :['',Validators.required],
      end :['',Validators.required],
      contributers :['',Validators.required],
      rating: ['', Validators.required]
    });
    console.log( this.editData);
    if(this.editData)  {
      this.actionBtn="Update";
      this.formValue.controls['title'].setValue(this.editData.title);
      this.formValue.controls['author'].setValue(this.editData.author);
      this.formValue.controls['description'].setValue(this.editData.description);
      this.formValue.controls['start'].setValue(this.editData.start);
      this.formValue.controls['end'].setValue(this.editData.end);
      this.formValue.controls['contributers'].setValue(this.editData.contributers);
      this.formValue.controls['rating'].setValue(this.editData.rating);
    }
  }
  addProject(){ 
    if(!this.editData){if(this.formValue.valid){ } 
  }else{this.updateProject() }
  
  }

  updateProject(){
    this.api.put(this.formValue.value,this.editData.id)
    .subscribe({
      next:(res)=>{alert("Project updated");
      this.formValue.reset();
      this.dialogRef.close('Updated');
    } })
  }

}
