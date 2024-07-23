import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, of, Subscription, tap } from 'rxjs';
import { AuthenticationService } from '../../core/services/auth.service';

@Directive({
  selector: '[showForRoles]',
  standalone: true
})
export class ShowForRolesDirective {

  @Input('showForRoles') rolesPermitidos?:string[];

  sub$:Subscription = new Subscription();
  authService = inject(AuthenticationService);

  constructor(private viewContainerRedf:ViewContainerRef, private templateRef:TemplateRef<any>) { }

  ngOnInit(): void {
    //TODO: tener en cuenta el rol
    const hasRole: boolean = Boolean(this.rolesPermitidos?.includes(this.authService.getCurrentUser().role));
    this.sub$ = of(hasRole)
    .pipe(
      distinctUntilChanged(),
      tap((hasRole) => hasRole
        ? this.viewContainerRedf.createEmbeddedView(this.templateRef)
        : this.viewContainerRedf.clear())
    )
    .subscribe();
  }

  ngOnDestroy(): void {
    if(this.sub$) this.sub$.unsubscribe();
  }
}
