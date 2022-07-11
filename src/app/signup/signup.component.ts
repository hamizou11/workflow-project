import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable, onErrorResumeNext, Subject } from 'rxjs';

import { AuthResponseData, AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user =new Subject<User>();
  public signupForm !: FormGroup;
  isLoginMode = true;
  isLoading = false;
  
   error !: string | null ;
  
  constructor(private formBuilder : FormBuilder,private http: HttpClient ,private router: Router,private authService :AuthService) { }

  ngOnInit(): void {
  }
 /* signUp(){ 
    this.http.post<any>("http://localhost:3000/profile",this.signupForm.value)
    .subscribe(res=> { 
      alert("signup succesful"),
      this.signupForm.reset();
      this.router.navigate(['login']);
    })
    

  }*/
  onSwitchMode(){ 
    this.isLoginMode =  !this.isLoginMode;
}
  onSubmit(form:NgForm){
    if(!form.valid){ return; }
    const email =form.value.email;
    const password =form.value.password;
    let authObs : Observable<AuthResponseData>;

    this.isLoading =true;

   if(this.isLoginMode){

     authObs= this.authService.login(email,password);


       }   else  { authObs=  this.authService.signup(email,password);}

  authObs.subscribe(res=> { 
    console.log(res);
    this.isLoading= false;
    this.router.navigate(['/addproject']);
  },errorMessage =>{ 
    
    console.log(errorMessage);
    this.error =errorMessage;

    this.isLoading =false;
}
  );
   form.reset();
 }

}
 