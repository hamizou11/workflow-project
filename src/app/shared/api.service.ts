import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient,private authService : AuthService) { }
  post(data :any){
    return this.http.post<any>("http://localhost:3000/projects",data).pipe(map((res:any)=>{ 
      return res ;
    }))
    
  }
  get(){
  
    return this.http.get<any>("http://localhost:3000/projects").pipe(map((res:any)=>{ 
      return res ;
    }))
    
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

  
}
