import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './authentification/login/index';
import { RegisterComponent } from './authentification/register/index';
import { HomeComponent } from './authentification/home/index';
import { AuthGuard } from './authentification/_guards/index';
import {ProfileComponent} from "./authentification/profile/profile.component";

const appRoutes: Routes = [
    { path: 'sign_in', component: LoginComponent },
    { path: 'sign_up', component: RegisterComponent },

    { path: '',component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile',component: ProfileComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);