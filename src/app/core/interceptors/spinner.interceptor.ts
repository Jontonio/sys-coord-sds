import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpEvent } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoaddingService } from '../services/loadding.service';

export const SpinnerInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoaddingService);
    loadingService.setLoadding(true);

    return next(req).pipe(
        finalize(() => loadingService.setLoadding(false))
    );
};
