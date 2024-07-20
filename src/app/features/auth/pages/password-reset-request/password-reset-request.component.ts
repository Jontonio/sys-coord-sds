import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { MaterialModule } from '../../../../material/custom-material.module';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports:[MaterialModule, ReactiveFormsModule],
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export default class PasswordResetRequestComponent implements OnInit {

  private email!: string;
  form!: UntypedFormGroup;
  loading!: boolean;

  constructor(
    private titleService: Title,
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('angular-material-template - Password Reset Request');

    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email])
    });

    this.form.get('email')?.valueChanges
      .subscribe((val: string) => { this.email = val.toLowerCase(); });
  }

  resetPassword() {
    // this.loading = true;
    // this.authService.passwordResetRequest(this.email)
    //   .subscribe(
    //     results => {
    //       this.router.navigate(['/auth/login']);
    //       this.notificationService.openSnackBar('Password verification mail has been sent to your email address.');
    //     },
    //     error => {
    //       this.loading = false;
    //       this.notificationService.openSnackBar(error.error);
    //     }
    //   );
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
