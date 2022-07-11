import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ProjectModel } from '../project.module';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  formValue !: FormGroup;
  project: ProjectModel = new ProjectModel ();

  constructor( private formBuilder : FormBuilder ,private api :ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      title :['',Validators.required],
      author :['',Validators.required],
      description :['',Validators.required],
      startdate :['',Validators.required],
      enddate :['',Validators.required]
    
  })
}
onSubmit (){
  if(this.formValue.valid){
  this.project.title = this.formValue.value.title;
  this.project.author = this.formValue.value.author;
  this.project.description = this.formValue.value.description;
  this.project.startdate = this.formValue.value.startdate;
  this.project.enddate = this.formValue.value.enddate;
  this.api.post(this.project).subscribe(res=> {console.log(res); alert("Project added")});
  this.formValue.reset();
 
  
  } 
}
}
