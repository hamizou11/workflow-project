import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject,throwError }  from 'rxjs';
import { User } from './user.model';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';





 export interface AuthResponseData{
  idToken :string;
  email :string;
  refreshToken :string;
  expiresIn :string;
  localId :string;
  registered? : boolean;
  

}
@Injectable({
    providedIn: 'root'
  })

  export class AuthService {
  
    user =new BehaviorSubject<User|null>(null);


    constructor(private http:HttpClient,private router :Router){}

  

    signup(email:string ,password :string ){
       return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAiCjI2oAptRGKQtfSQUzrYWlcTrDuKTeg",
      {
        email : email,
        password : password,
        returnSecureToken : true

      }
      ).pipe(catchError(this.handleError),tap(res =>{
        this.handleAuthentification(res.email,res.localId,res.idToken,+res.expiresIn)
         
      }));
    }
    login(email :string ,password : string){

       return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyAiCjI2oAptRGKQtfSQUzrYWlcTrDuKTeg",
      {
        email : email,
        password : password,
        returnSecureToken : true

      }).pipe(catchError(this.handleError),tap(res =>{
        this.handleAuthentification(res.email,res.localId,res.idToken ,+res.expiresIn)
         
      })
      );
    }
     private handleAuthentification(email:string,token : string ,userId:string,expiresIn : number){
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(email,
        userId,
        token,
       expirationDate );
      
       this.user.next(user);
       localStorage.setItem('userData',JSON.stringify(user));
      }

     
      

    private handleError(errorRes :HttpErrorResponse){
      
      let errorMessage ='Uknown error';
      if(!errorRes.error || ! errorRes.error.error){ return throwError(errorMessage);        }
      switch(errorRes.error.error.message) { 
        case 'EMAIL_EXISTS': 
        errorMessage ='this email already exists ! ';
        break;
        case 'EMAIL_NOT_FOUND': 
        errorMessage ='Email does not exist!';
        break;
        case 'INVALID_PASSWORD': 
        errorMessage ='Invalid Password !';
        break;
        
      }
    
     return throwError(errorMessage);        
  
    }

    logout(){

      this.user.next(null);
      this.router.navigate(['/signup']);
    }
}