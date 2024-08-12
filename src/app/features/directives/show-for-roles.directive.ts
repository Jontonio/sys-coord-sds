import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, map, of, Subscription, tap } from 'rxjs';
import { AuthenticationService } from '../../core/services/auth.service';

@Directive({
  selector: '[showForRoles]',
  standalone: true
})
export class ShowForRolesDirective {

  @Input('showForRoles') rolesPermitidos?: string[];

  sub$: Subscription = new Subscription();
  authService = inject(AuthenticationService);

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  ngOnInit(): void {

    const userAuth = this.authService.getUserAuth;

    const hasRole$ = of(userAuth.roles)
      .pipe(
        map(roles => roles.some(role => this.rolesPermitidos?.includes(role.name.toUpperCase()))),
        distinctUntilChanged()
      );

    this.sub$ = hasRole$
      .pipe(
        tap(hasRole => hasRole
          ? this.viewContainerRef.createEmbeddedView(this.templateRef)
          : this.viewContainerRef.clear())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.sub$) this.sub$.unsubscribe();
  }
}
