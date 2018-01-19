import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }
    from '@angular/forms';

import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {

    email = "default"
    name = "default"
    constructor(
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {
        // reset sign_in status
        this.getUser();
    }

    getUser() {
        console.log("Get user")
        this.userService.getUser().subscribe(result => {
            console.log(result)
                // if (result === true) {
                //    // this.router.navigate(['/']);
                // } else {
                //     //this.error = 'Username or password is incorrect';
                //     //this.loading = false;
                // }
            });
    }

}
