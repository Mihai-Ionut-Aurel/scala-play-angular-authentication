import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }
    from '@angular/forms';

import { AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    sign_in_form= new FormGroup({
        email: new FormControl('', [Validators.email,Validators.required]),
        password: new FormControl('', Validators.required),
        remember_me: new FormControl(''),
    });
    submitted = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset sign_in status
        this.authenticationService.logout();
        this.sign_in_form.patchValue({"remember_me":false})
    }

    sign_in() {
        this.submitted = true;
        this.authenticationService.sign_in(this.sign_in_form.get("email").value, this.sign_in_form.get("password").value,this.sign_in_form.get("remember_me").value)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/profile']);
                } else {
                    //this.error = 'Username or password is incorrect';
                    //this.loading = false;
                }
            });
    }
    sign_up()
    {
        this.router.navigate(['/sign_up']);
    }
}
