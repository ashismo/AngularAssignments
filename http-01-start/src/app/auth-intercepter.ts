import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators'

// ASHISH: Interceptor to intercept all requests in a common place
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // ASHISH: Modify the request and send the request to over the http
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        });
        return next.handle(modifiedRequest);
    }
}