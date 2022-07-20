import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ContributeComponent } from '../contribute/contribute.component';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { ProjectModel } from '../project.module';
import { RatingComponent } from '../rating/rating.component';
import { ApiService } from '../shared/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {


  displayedColumns: string[] = ['title', 'author', 'description', 'startdate','enddate','contributers','rating','edit','delete','contribute','rate'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  projectdata !: any;
  formValue !: FormGroup;
  project: ProjectModel = new ProjectModel();
  constructor(  private api :ApiService,private route :ActivatedRoute ,private router: Router,private dialog : MatDialog) { }
  ngOnInit(): void {
    this.getAllProject();
  }
  getAllProject(){

    this.api.get().subscribe((projects:ProjectModel[])=>{
     
      this.dataSource= new MatTableDataSource(projects);
      this.dataSource.paginator =this.paginator;
      this.dataSource.sort= this.sort;

    
   
   })
  }

   deleteProject(row :ProjectModel){
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

  
       contribute(element :ProjectModel){
        this.dialog.open(ContributeComponent, {
         width :'50%',
         data :element
       }).afterClosed().subscribe(val=>{ 
        if(val === 'Updated') { this.getAllProject();}
       
       })
       
        
       }
       rating(row :ProjectModel){
        this.dialog.open(RatingComponent, {
          
         width :'50%',
         data :row
       }).afterClosed().subscribe(val=>{ 
        if(val === 'Updated') { this.getAllProject();}
       
       })
      
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
