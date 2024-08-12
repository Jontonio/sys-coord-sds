import { Component, Inject, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, Validators, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material/custom-material.module';
import { AuthenticationService } from '../../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    standalone:true,
    imports:[CommonModule,
             ReactiveFormsModule,
             MaterialModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export default class LoginComponent {

    private toastr = inject(ToastrService);

    loginForm!: UntypedFormGroup;
    loading!: boolean;
    titleService = inject(Title);
    authService  = inject(AuthenticationService);

    constructor(private router: Router) {
        this.titleService.setTitle('Login');
        this.createForm();
    }

    private createForm() {

        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(savedUserEmail, [Validators.required, Validators.email]),
            password: new UntypedFormControl(null, Validators.required),
            rememberMe: new UntypedFormControl(savedUserEmail !== null)
        });
    }

    // getters
    get email(){
      return this.loginForm.controls['email']
    }
    get password(){
      return this.loginForm.controls['password']
    }
    get rememberMe(){
      return this.loginForm.controls['rememberMe']
    }

    login() {
        const email = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;
        const rememberMe = this.loginForm.get('rememberMe')?.value;
        this.loading = true;
        // llamar endpoint
        this.authService.login(email, password).subscribe({
          next:() => {
            this.loading = false;
            localStorage.setItem('savedUserEmail', email);
            this.router.navigate(['main/dashboard/home']);
          },
          error:(err) => {
            this.loading = false;
          }
        })
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
