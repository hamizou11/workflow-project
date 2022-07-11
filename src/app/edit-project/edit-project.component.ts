import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectModel } from '../project.module';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  formValue !: FormGroup;
  actionBtn :string ="Edit";
  projectdata !: any;
   
  constructor(private dialog : MatDialog,private api :ApiService,private formbuilder:FormBuilder,
   private dialogRef :MatDialogRef<EditProjectComponent>
       ,@Inject (MAT_DIALOG_DATA) public editData :any ) { }


  ngOnInit(): void {
     

    this.formValue = this.formbuilder.group({
      title :['',Validators.required],
      author :['',Validators.required],
      description :['',Validators.required],
      startdate :['',Validators.required],
      enddate :['',Validators.required]
    
    
    
    })
    if(this.editData)  {
      this.actionBtn="Update";
      this.formValue.controls['title'].setValue(this.editData.title);
      this.formValue.controls['author'].setValue(this.editData.author);
      this.formValue.controls['description'].setValue(this.editData.description);
      this.formValue.controls['startdate'].setValue(this.editData.startdate);
      this.formValue.controls['enddate'].setValue(this.editData.enddate);
    }
    
    
  }

  getAllProject(){

    this.api.get().subscribe(res=>{
      this.projectdata =res;
   })
  }

  openDialog() {
    this.dialog.open(EditProjectComponent, {
     
      width :'30%'
    })
  }
  addProject(){ 
    if(!this.editData){if(this.formValue.valid){ } 
  }else{this.updateProject() }
  
  }

  updateProject(){
    this.api.put(this.formValue.value,this.editData.id)
    .subscribe({
      next:(res)=>{alert("Artical updated");
      this.formValue.reset();
      this.dialogRef.close('Updated');
    } })
  }
}
