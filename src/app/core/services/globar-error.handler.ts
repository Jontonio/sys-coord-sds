import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {


    constructor(private injector: Injector) { }

    handleError(error: Error) {
        // Obtain dependencies at the time of the error
        const logger = this.injector.get(NGXLogger);

        const err = {
            message: error.message ? error.message : error.toString(),
            stack: error.stack ? error.stack : ''
        };

        // Log  the error
        logger.error(err);

        // Re-throw the error
        throw error;
    }
}
