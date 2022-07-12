import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ContributeComponent } from '../contribute/contribute.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { ProjectModel } from '../project.module';
import { RatingComponent } from '../rating/rating.component';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {

  projectdata !: any;
  formValue !: FormGroup;
  project: ProjectModel = new ProjectModel();
  constructor(  private api :ApiService,private route :ActivatedRoute ,private router: Router,private dialog : MatDialog) { }
  ngOnInit(): void {
    this.getAllProject();
  }
  getAllProject(){

    this.api.get().subscribe(res=>{
      this.projectdata =res;
   
   })
  }

   deleteProject(row :any){
    this.api.delete(row.id).subscribe(res=>{
      alert("Article Deleted");
      this.getAllProject();
    })
    
     
      }

      searchText :string='';
      onSearchTextEntered(searchValue:string){
        this.searchText= searchValue;
        console.log(this.searchText);
      
      }

      editArtical(row :any){
        this.dialog.open(EditProjectComponent, {
          
         width :'50%',
         data :row
       }).afterClosed().subscribe(val=>{ 
        if(val === 'Updated') { this.getAllProject();}
       
       })
        
       }
       Contribute(row :any){
        this.dialog.open(ContributeComponent, {
          
         width :'50%',
         data :row
       }).afterClosed().subscribe(val=>{ 
        if(val === 'Updated') { this.getAllProject();}
       
       })
       
        
       }
       rating(row :any){
        this.dialog.open(RatingComponent, {
          
         width :'50%',
         data :row
       }).afterClosed().subscribe(val=>{ 
        if(val === 'Updated') { this.getAllProject();}
       
       })
      
}
}
