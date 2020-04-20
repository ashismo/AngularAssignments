import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  count = 1;
  clickList: any = [];
  isTextDisplay: boolean = true;
  onClick() {
    this.clickList.push(this.count++)
  }

  getBgColor() {
    if(this.count > 4) {
      return 'blue';
    }
    return "white";
  }

  getTextColor() {
    if(this.count > 4) {
      return true;
    }
    return false;
  }
}
