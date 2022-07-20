import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-contribute',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  formValue !: FormGroup;
  actionBtn :string ="Edit";
  projectdata !: any;
   
  constructor(private dialog : MatDialog,private api :ApiService,private formbuilder:FormBuilder,
   private dialogRef :MatDialogRef<RatingComponent>
       ,@Inject (MAT_DIALOG_DATA) public editData :any ) { }

      

  ngOnInit(): void {
     

    this.formValue = this.formbuilder.group({
      title :['',Validators.required],
      author :['',Validators.required],
      description :['',Validators.required],
      start :['',Validators.required],
      end :['',Validators.required],
      contributers :['',Validators.required],
      rating: ['', Validators.required],
    
    
    
    })
    if(this.editData)  {
      this.actionBtn="Rate";
      this.formValue.controls['title'].setValue(this.editData.title);
      this.formValue.controls['author'].setValue(this.editData.author);
      this.formValue.controls['description'].setValue(this.editData.description);
      this.formValue.controls['start'].setValue(this.editData.start);
      this.formValue.controls['end'].setValue(this.editData.end);
      this.formValue.controls['contributers'].setValue(this.editData.contributers);
      this.formValue.controls['rating'].setValue(this.editData.rating);
    
    }
    this.getAllProject();
    
  }


 
  getAllProject(){

    this.api.get().subscribe(res=>{
      this.projectdata =res;
   })
  }

  openDialog() {
    this.dialog.open(RatingComponent, {
     
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
      next:(res)=>{alert("Rating added");
      this.formValue.reset();
      this.dialogRef.close('Updated');
    } })
  }
  
}
