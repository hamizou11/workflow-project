import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ListProjectComponent } from './list-project/list-project.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuard } from './signup/auth-guard';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [{ path:'login',component:LoginFormComponent},
{ path:'signup',component:SignupComponent}  ,
{ path:'dashboard',component:DashboardComponent},
{ path:'addproject',component:AddProjectComponent},
{ path:'listproject',component:ListProjectComponent},
{ path:'calendar',component:CalendarComponent},
{ path:'edit/:id',component:EditProjectComponent}]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
