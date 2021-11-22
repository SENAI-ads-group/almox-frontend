import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class HandleErrorHttpInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private messageService: MessageService
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem(
            environment.auth.tokenLocalStorage
        );
        if (accessToken != null) {
            request = request.clone({
                setHeaders: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${accessToken}`,
                },
            });
        }

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                const handleError = this[`handleError${err.status}`];
                if (handleError) {
                    handleError(err);
                } else {
                    this.genericHandleError(err);
                }
                return throwError(err);
            })
        );
    }

    private handleError401 = (errorResponse: HttpErrorResponse) => {
        this.genericHandleError(errorResponse);

        localStorage.removeItem(environment.auth.tokenLocalStorage);
        this.router.navigate(["/login"]);
    };

    private handleError400 = (errorResponse: HttpErrorResponse) => {
        this.genericHandleError(errorResponse);
    };

    private genericHandleError = (errorResponse: HttpErrorResponse) => {
        const { error } = errorResponse;
        this.messageService.addAll(error.messages.map((msg : string) => {
            return {
                key: "notification",
                severity: "error",
                summary: msg,
            }
        }));
    };
}
