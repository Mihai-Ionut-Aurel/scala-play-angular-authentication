import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/index';
import {Sign_up_message} from "../_models/index";
import { FormGroup, FormControl, Validators, FormBuilder }
    from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {

    sign_up_form= new FormGroup({
        fullName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.email,Validators.required]),
        password: new FormControl('', Validators.required),
    });
    submitted = false;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset sign_in status
        //this.authenticationService.logout();
    }

    sign_up() {
        this.authenticationService.sign_up(this.sign_up_form.get("fullName").value,this.sign_up_form.get("email").value, this.sign_up_form.get("password").value)
            .subscribe(result => {
                if (result.success === true) {
                    this.router.navigate(['/']);
                } else {

                }
            });
    }
    sign_out(){
        this.authenticationService.sign_out();

    }
}
