import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoaddingService } from '../services/loadding.service';
import { NotificationService } from '../services/notification.service';

export const handdleErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const _loadding = inject(LoaddingService);
    const _notify = inject(NotificationService);

    return next(req).pipe(
        catchError((e) => {
            _loadding.setLoadding(false);
            if (e.error?.errors) {
                Object.keys(e.error.errors).forEach(label =>
                    _notify.error(e.error.message, e.error.errors[label][0])
                );
            } else if (e.error && !e.error.errors) {
                _notify.error('ERROR', e.error.message);
            } else if (e.message) {
                _notify.error('ERROR', e.message);
            } else {
                _notify.error('ERROR', 'An unknown error occurred');
            }
            return throwError(() => e);
        })
    );
};
