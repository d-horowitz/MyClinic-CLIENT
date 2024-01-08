import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ViewPatientsComponent } from './components/view-patients/view-patients.component';
import { PatientComponent } from './components/patient/patient.component';
import { MakeAppointmentComponent } from './components/make-appointment/make-appointment.component';
import { PatientNavbarComponent } from './components/patient-navbar/patient-navbar.component';
import { ViewDoctorsComponent } from './components/view-doctors/view-doctors.component';
import { DoctorNavbarComponent } from './components/doctor-navbar/doctor-navbar.component';
import { DoctorScheduleComponent } from './components/doctor-schedule/doctor-schedule.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'patients', component: ViewPatientsComponent },
    {
        path: 'patients/:id', component: PatientNavbarComponent, children: [
            { path: 'appointments', component: PatientComponent },
            { path: 'make-an-appointment', component: MakeAppointmentComponent }
        ]
    },
    { path: 'doctors', component: ViewDoctorsComponent },
    {
        path: 'doctors/:id', component: DoctorNavbarComponent, children: [
            { path: 'schedule', component: DoctorScheduleComponent }
        ]
    }

];
