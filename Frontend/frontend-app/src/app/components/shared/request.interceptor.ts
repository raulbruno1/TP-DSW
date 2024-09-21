import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { SpinnerService } from './spinner/spinner.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private readonly spinnerService: SpinnerService,
    private readonly tokenStorageService: TokenStorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.show();

    let clonedRequest = request;

    const authToken = this.tokenStorageService.getToken();

    if (authToken) {
      clonedRequest = request.clone({
        setHeaders: {
          Authorization: `${authToken}`
        }
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.error('Error de solicitud:', error);

          const status = error.status;
          const message = error.message;
          const errorResponse = error.error; 
        }

        return throwError(() => error);
      }),
      finalize(() => this.spinnerService.hide())
    );
  }
}