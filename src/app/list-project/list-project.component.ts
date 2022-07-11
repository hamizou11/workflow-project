import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { ProjectModel } from '../project.module';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {

  projectdata !: any;
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
}
