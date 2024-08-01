import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

  private toastr = inject(ToastrService);

  public openSnackBar(message: string) {
      this.toastr.success(message,'test');
  }
  public success(title:string, message: string) {
      this.toastr.success(message, title);
  }
  public error(title:string, message: string) {
      this.toastr.error(message, title);
  }
  public warning(title:string, message: string) {
      this.toastr.warning(message, title);
  }
  public info(title:string, message: string) {
      this.toastr.info(message, title);
  }
}
