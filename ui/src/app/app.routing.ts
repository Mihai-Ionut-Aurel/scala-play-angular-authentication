import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './authentification/login/index';
import { RegisterComponent } from './authentification/register/index';
import { HomeComponent } from './authentification/home/index';
import { AuthGuard } from './authentification/_guards/index';

const appRoutes: Routes = [
    { path: 'sign_in', component: LoginComponent },
    { path: '',component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'sign_up', component: RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);