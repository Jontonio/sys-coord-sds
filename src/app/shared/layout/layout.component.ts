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
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { iconsList } from '../icons/icons';

@Component({
    selector: 'app-layout',
    standalone:true,
    imports:[MaterialModule, RouterModule, ShowForRolesDirective, NgIconComponent],
    providers: [provideIcons({ ...iconsList, heroUsers })],
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
      icon: "featherHome",
      permitRoles:['USER_ROOT','UGEL_USER','DIRECTOR_USER','COORD_USER','DOCENTE']
    },
    {
      nameRoute: "Programación académica",
      route: "/programacion-academica/home",
      icon: "featherCalendar",
      permitRoles:['DOCENTE']
    },
    {
      nameRoute: "Docentes",
      route: "/docente/home",
      icon: "featherUsers",
      permitRoles:['USER_ROOT','UGEL_USER','DIRECTOR_USER','COORD_USER']
    },
    {
      nameRoute: "Asignaturas",
      route: "/asignatura/home",
      icon: "featherBook",
      permitRoles:['USER_ROOT','UGEL_USER','DIRECTOR_USER']
    },
    {
      nameRoute: "Unidades",
      route: "/unidades-de-clase/home",
      icon: "featherArchive",
      permitRoles:['USER_ROOT','UGEL_USER','DIRECTOR_USER','COORD_USER','DOCENTE']
    },
    {
      nameRoute: "Configuración",
      route: "/configuracion/home",
      icon: "featherSettings",
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
