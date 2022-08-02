import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectModel } from '../project.module';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import ClassicEditor  from '@ckeditor/ckeditor5-build-classic'
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  formValue !: FormGroup;
  public Editor = ClassicEditor;
  project: ProjectModel = new ProjectModel ();
  constructor( private formBuilder : FormBuilder ,
    private api :ApiService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      title :['',Validators.required],
      author :['',Validators.required],
      category :['',Validators.required],
      description :['',Validators.required],
      start :['',Validators.required],
      end :['',Validators.required]
    
  })
  this.authService.autoLogin();
}
onSubmit (){
  if(this.formValue.valid){
  this.project.title = this.formValue.value.title;
  this.project.author = this.formValue.value.author;
  this.project.category = this.formValue.value.category;
  this.project.description = this.formValue.value.description;
  this.project.start = this.formValue.value.start;
  this.project.end = this.formValue.value.end;
  this.api.post(this.project).subscribe(res=> {
     console.log(res);
     alert("Project added")});
     this.formValue.reset();
  
  
 
  
  } 
}

}
