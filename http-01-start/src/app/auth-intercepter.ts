import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators'

// ASHISH: Interceptor to intercept all requests in a common place
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // ASHISH: This mthod will be called just before the request is sent from an angular application
        console.log("Requesy is on its way");
        // ASHISH: Modify the request and send the request to over the http
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        })

        // ASHISH: Intercept the response
        return next.handle(modifiedRequest).pipe(tap(event => {
            console.log(event);
            if(event.type === HttpEventType.Response) {
                console.log("Response has arrived");
                console.log(event.body);
            }
        }));
    }
}