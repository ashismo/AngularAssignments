import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs'; 
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscribe: Subscription;
  customSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // ASHISH: Subscribed here. We should unsubscribe manually as this observable is not provided by angular core.
    this.subscribe = interval(1000).subscribe((count)=>{
      console.log(count);
    });

    // ASHISH: Build custom observable
    const customInterval = Observable.create( observer => {
      let count = 1000;
      setInterval(
        () => {
          observer.next(count++);
          if(count > 1005) {
            // ASHISH : Observable completed
            observer.complete();
          }
          if(count > 1003) {
            observer.error(new Error("ERROR: Count has exceeded 1003"));
          }
        }, 1000
      );
    });

    // ASHISH : Use operator to format data before subscription.
    this.customSubscription = customInterval.pipe(
      filter(
        (data: number) => {
          return data > 1001;
        }
      ), // ASHISH: The map() and subscription() will be executed once the filter returns true.
      map(
        (data:number) =>{
          return "Round: " + (data % 500);
        }
      )
    ).subscribe(
      (data) => {
        console.log(data);  // ASHISH: The custom observable emits the count (L:26)
      },
      error => {
        alert("An error has occured: " + error);
      },
      () => {
        alert("Completed"); // ASHISH: As the observable completed so it will not execute this alert.
      }
    );
  }

  ngOnDestroy() {
    // ASHISH: The unsubscription is mandatory as this observable is not provided by the angular
    this.subscribe.unsubscribe();

    // ASHISH: Destroy custom observable 
    this.customSubscription.unsubscribe();
  }
}
