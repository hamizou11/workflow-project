import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ProjectModel } from '../project.module';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  project : ProjectModel= new ProjectModel();

  constructor(private http : HttpClient,private authService : AuthService) { }
  post(data :any){
    return this.http.post<any>("http://localhost:3000/projects",data).pipe(map((res:any)=>{ 
      return res ;
    }))
    
  }
  get(){
   return  this.authService.user.pipe(take(1),exhaustMap(user =>{  return this.http.get<any>("http://localhost:3000/projects?auth="+user?.token) 
  }),  map((res:any)=>{ 
    return res ;
   })
    );
   
    
  }
  put(data :any ,id:number){
    return this.http.put<any>("http://localhost:3000/projects/"+id,data).pipe(map((res:any)=>{ 
      return res ;
    }))
    
  }
  delete(id:number){
    return this.http.delete<any>("http://localhost:3000/projects/"+id).pipe(map((res:any)=>{ 
      return res ;
    }))
    
  }
  put_cont(data :any ,id:number){
    return this.http.put<any>("http://localhost:3000/projects/"+id,data).pipe(map((res:any)=>{ 
      this.project.contributers++ ;
      return res ;
    }))
    
  }
  getCurrentData(id:number){ 
    return this.http.get<any>("http://localhost:3000/projects/"+id);
  }

}
