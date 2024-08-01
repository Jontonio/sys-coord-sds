import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs';
import { LoaddingService } from '../services/loadding.service';

export const SpinnerInterceptor: HttpInterceptorFn = (req, next) => {

    const loadingService = inject(LoaddingService);
    loadingService.setLoadding(true);

    return next(req)
        .pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    loadingService.setLoadding(false);
                }
            }, (error) => {
                loadingService.setLoadding(false);
            })
        );
}
