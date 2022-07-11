import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
    public loginForm !:FormGroup;
    isLoginMode = true;


  constructor(private formBuilder: FormBuilder ,private http :HttpClient,private router : Router) { }

  ngOnInit(): void {
    this.loginForm =this.formBuilder.group({ 
    email  :[''],
    password : ['']
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/profile").subscribe(res=>{ 

        const user = res.find((a:any)=>{ 
        return a.emai === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){ 
        alert("Login sucess");
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }else { alert("user not found");}
    })
    
    
  
}
onSwitchMode(){ 
    this.isLoginMode =  !this.isLoginMode;
}
}
