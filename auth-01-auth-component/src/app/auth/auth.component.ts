import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}
  onSwitchModel() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    if(!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if(this.isLoginMode) {

    } else {
      this.authService.signup(email, password).subscribe(
        responseData => {
          this.isLoading = false;
          console.log(responseData);
        },
        error => {
          this.isLoading = false;
          console.log(error);
          this.error = 'An error occured!';
        }
      );
    }
    form.reset();
  }
}
