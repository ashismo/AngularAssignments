import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription } from 'rxjs'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscribe: Subscription;
  constructor() { }

  ngOnInit() {
    // ASHISH: Subscribed here. We should unsubscribe manually as this observable is not provided by angular core.
    this.subscribe = interval(1000).subscribe((count)=>{
      console.log(count);
    });
  }

  ngOnDestroy() {
    // ASHISH: The unsubscription is mandatory as this observable is not provided by the angular
    this.subscribe.unsubscribe();
  }
}
