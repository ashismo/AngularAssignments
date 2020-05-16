import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  signupForm: FormGroup;
  forbiddenUserNames = ['ashish', 'mondal'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // ASHSIH: Status changes and value changes to monitor the fields closely
    this.signupForm.valueChanges.subscribe(
      (value) => console.log(value)
    );

    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    )
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  // ASHISH: Custom validator
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUserNames.indexOf(control.value)) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  // ASHISH: Asynchronous validator: This is needed when we call backend service to validate a data
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(
          () => {
            if (control.value == "a@b.c") {
              resolve({'nameIsForbidden': true});
            } else {
              resolve(null);
            }
          },
          1500
        )
      }
    )
    return promise;
  }
}
