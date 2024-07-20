import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../../core/services/spinner.service';
import { MaterialModule } from '../../material/custom-material.module';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-layout',
    standalone:true,
    imports:[MaterialModule, RouterModule],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
})
export default class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner: boolean = false;
    userName: string = "";
    isAdmin: boolean = false;

    private autoLogoutSubscription: Subscription = new Subscription;
    // private authService = inject(AuthenticationService);

    constructor(private changeDetectorRef: ChangeDetectorRef,
      private media: MediaMatcher,
      public spinnerService: SpinnerService) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
        // const user = this.authService.getCurrentUser();

        // this.isAdmin = user.isAdmin;
        // this.userName = user.fullName;

        // Auto log-out subscription
        const timer$ = timer(2000, 5000);
        this.autoLogoutSubscription = timer$.subscribe(() => {
            // this.authGuard.canActivate();
        });
      }


      ngOnInit(): void {

    }

    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }
}
