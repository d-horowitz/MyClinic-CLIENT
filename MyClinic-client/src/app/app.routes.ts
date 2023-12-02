import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ViewPatientsComponent } from './components/view-patients/view-patients.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'patients', component: ViewPatientsComponent }
];
