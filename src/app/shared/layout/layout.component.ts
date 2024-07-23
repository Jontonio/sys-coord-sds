import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../../core/services/spinner.service';
import { MaterialModule } from '../../material/custom-material.module';
import { RouterModule } from '@angular/router';
import { MainRoute } from '../interface/main-routes';
import { AuthenticationService } from '../../core/services/auth.service';
import { ShowForRolesDirective } from '../../features/directives/show-for-roles.directive';

@Component({
    selector: 'app-layout',
    standalone:true,
    imports:[MaterialModule, RouterModule, ShowForRolesDirective],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
})
export default class LayoutComponent implements OnDestroy, AfterViewInit {

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  showSpinner: boolean = false;
  userName: string = "";

  listRoutes:MainRoute[] = [
    {
      nameRoute: "Dashboard",
      route: "/dashboard/home",
      icon: "dashboard",
      permitRoles:['USER_ROOT','UGEL_USER','DIRECTOR_USER','COORD_USER']
    },
    {
      nameRoute: "Docentes",
      route: "/docente/home",
      icon: "groups",
      permitRoles:['USER_ROOT','UGEL_USER','DIRECTOR_USER','COORD_USER']
    },
    {
      nameRoute: "Grado y sección",
      route: "#",
      icon: "account_tree",
      permitRoles:['USER_ROOT','UGEL_USER','DIRECTOR_USER']
    },
    {
      nameRoute: "Areas",
      route: "#",
      icon: "menu_book",
      permitRoles:['USER_ROOT','UGEL_USER','DIRECTOR_USER']
    },
    {
      nameRoute: "Instituciones",
      route: "#",
      icon: "apartment",
      permitRoles:['USER_ROOT','UGEL_USER']
    },
  ];

  private autoLogoutSubscription: Subscription = new Subscription;
  private authService = inject(AuthenticationService);
  public spinnerService = inject(SpinnerService);

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher) {

      this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addEventListener('change', this._mobileQueryListener);
      const user = this.authService.getCurrentUser();
      this.userName = user.name;
      console.log(user)
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }
}
