import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';

// used to create fake backend
//import { fakeBackendProvider } from './_helpers/index';


import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './authentification/_guards/index';
import { AuthenticationService, UserService,TokenInterceptor} from './authentification/_services/index';
import { LoginComponent } from './authentification/login/index';
import { RegisterComponent } from './authentification/register/index';
import { HomeComponent } from './authentification/home/index';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClarityModule } from "clarity-angular";



@NgModule({
  imports: [
      ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
      ClarityModule,
      routing
  ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent
    ],
    providers: [
        AuthGuard,
        AuthenticationService,

    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
