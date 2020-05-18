import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';

// ASHISH: Interceptor to intercept all requests in a common place
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // ASHISH: This mthod will be called just before the request is sent from an angular application
        console.log("Requesy is on its way");
        // ASHISH: Modify the request and send the request to over the http
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        })
        return next.handle(modifiedRequest);
    }
}