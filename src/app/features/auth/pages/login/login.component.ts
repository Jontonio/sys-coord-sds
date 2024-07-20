import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, Validators, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material/custom-material.module';

@Component({
    selector: 'app-login',
    standalone:true,
    imports:[CommonModule, ReactiveFormsModule, MaterialModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export default class LoginComponent implements OnInit {

    loginForm!: UntypedFormGroup;
    loading!: boolean;

    constructor(private router: Router,
        private titleService: Title,
        // private notificationService: NotificationService,
        // private authenticationService: AuthenticationService
      ) {
    }

    ngOnInit() {
        this.titleService.setTitle('angular-material-template - Login');
        // this.authenticationService.logout();
        this.createForm();
    }

    private createForm() {
        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(savedUserEmail, [Validators.required, Validators.email]),
            password: new UntypedFormControl('', Validators.required),
            rememberMe: new UntypedFormControl(savedUserEmail !== null)
        });
    }

    login() {
        const email = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;
        const rememberMe = this.loginForm.get('rememberMe')?.value;
        this.router.navigate(['/dashboard/home']);

        this.loading = true;
        // this.authenticationService
        //     .login(email.toLowerCase(), password)
        //     .subscribe(
        //         data => {
        //             if (rememberMe) {
        //                 localStorage.setItem('savedUserEmail', email);
        //             } else {
        //                 localStorage.removeItem('savedUserEmail');
        //             }
        //             this.router.navigate(['/']);
        //         },
        //         error => {
        //             this.notificationService.openSnackBar(error.error);
        //             this.loading = false;
        //         }
        //     );
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
