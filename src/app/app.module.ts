import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import {MatCardModule} from '@angular/material/card'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { SignupComponent } from './signup/signup.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProjectComponent } from './add-project/add-project.component';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldControl } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { ListProjectComponent } from './list-project/list-project.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { EditProjectComponent } from './edit-project/edit-project.component';
import {MatIconModule} from '@angular/material/icon';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { CalendarComponent } from './calendar/calendar.component';
import { ContributeComponent } from './contribute/contribute.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { RatingComponent } from './rating/rating.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DayPilotModule } from "daypilot-pro-angular";
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EdiCalendComponent } from './edi-calend/edi-calend.component';



FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin

]);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginFormComponent,
    SignupComponent,
    SidebarComponent,
    DashboardComponent,
    AddProjectComponent,
    ListProjectComponent,
    SearchComponent,
    EditProjectComponent,
    LoadingSpinnerComponent,
    CalendarComponent,
    ContributeComponent,
    RatingComponent,
    EdiCalendComponent
  
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatSidenavModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ScheduleModule,
    NgChartsModule,
    NgxStarRatingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DayPilotModule,
    FullCalendarModule
    
    
    
    
 

    
  
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
