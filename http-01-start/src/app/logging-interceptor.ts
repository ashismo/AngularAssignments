import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // ASHISH: This mthod will be called just before the request is sent from an angular application
        console.log("Requesy is on its way");
        console.log(req.url);
         // ASHISH: Intercept the response
         return next.handle(req).pipe(tap(event => {
            console.log("Event: ", event);
            if(event.type === HttpEventType.Response) {
                console.log("Response has arrived");
                console.log(event.body);
            }
        })
        );
    }
}