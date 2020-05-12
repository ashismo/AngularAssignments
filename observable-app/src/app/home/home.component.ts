import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs'; 

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
        }, 1000
      );
    });

    this.customSubscription = customInterval.subscribe(
      (data) => {
        console.log(data);  // ASHISH: The custom observer emits the count 
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
