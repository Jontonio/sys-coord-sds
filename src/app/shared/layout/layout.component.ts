import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
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
import { LoaddingService } from '../../core/services/loadding.service';
import { CacheService } from '../../core/services/cache.service';
import { SkeletonComponent } from '../components/skeleton/skeleton.component';

@Component({
    selector: 'app-layout',
    standalone:true,
    imports:[MaterialModule,
            RouterModule,
            ShowForRolesDirective,
            SkeletonComponent,
            NgIconComponent],
    providers: [provideIcons({ ...iconsList, heroUsers })],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
})
export default class LayoutComponent implements OnDestroy, AfterViewInit {

  private _mobileQueryListener: () => void;
  private _authService = inject(AuthenticationService);
  public cacheService = inject(CacheService);

  mobileQuery: MediaQueryList;
  showSpinner: boolean = false;

  listRoutes:MainRoute[] = [
    {
      nameRoute: "Dashboard",
      route: "../dashboard/home",
      icon: "featherHome",
      permitRoles:['ROOT_USER','UGEL_USER','DIRECTOR_USER','COORD_USER','DOCENTE_USER']
    },
    {
      nameRoute: "Instituciones",
      route: "../institucion/home",
      icon: "featherAward",
      permitRoles:['ROOT_USER','UGEL_USER']
    },
    {
      nameRoute: "Programación académica",
      route: "../programacion-academica/home",
      icon: "featherCalendar",
      permitRoles:['DOCENTE_USER']
    },
    {
      nameRoute: "Docentes",
      route: "../docente/home",
      icon: "featherUsers",
      permitRoles:['ROOT_USER','UGEL_USER','DIRECTOR_USER','COORD_USER']
    },
    {
      nameRoute: "Colegiados",
      route: "../college/home",
      icon: "featherBookmark",
      permitRoles:['ROOT_USER','UGEL_USER','DIRECTOR_USER','COORD_USER']
    },
    {
      nameRoute: "Asignaturas",
      route: "../asignatura/home",
      icon: "featherBook",
      permitRoles:['ROOT_USER','UGEL_USER','DIRECTOR_USER']
    },
    {
      nameRoute: "Unidades",
      route: "../unidades-de-clase/home",
      icon: "featherArchive",
      permitRoles:['ROOT_USER','UGEL_USER','DIRECTOR_USER','COORD_USER','DOCENTE_USER']
    },
    {
      nameRoute: "Configuración",
      route: "../configuracion/home",
      icon: "featherSettings",
      permitRoles:['ROOT_USER','UGEL_USER','DIRECTOR_USER']
    },
  ];

  private autoLogoutSubscription: Subscription = new Subscription;
  public authService = inject(AuthenticationService);
  public loadingService = inject(LoaddingService);

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher) {
      this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    logout() {
      this._authService.logout();
      this._authService.redirecToLogin();
    }
}
