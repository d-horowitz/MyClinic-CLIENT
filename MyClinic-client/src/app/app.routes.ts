import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ViewPatientsComponent } from './components/view-patients/view-patients.component';
import { PatientComponent } from './components/patient/patient.component';
import { MakeAppointmentComponent } from './components/make-appointment/make-appointment.component';
import { PatientNavbarComponent } from './components/patient-navbar/patient-navbar.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'patients', component: ViewPatientsComponent },
    { path: 'patients/:id', component: PatientNavbarComponent, children:[
        {path:'', component:PatientComponent},
        {path: 'make-an-appointment', component: MakeAppointmentComponent}
    ] },
    
];
