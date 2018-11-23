import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('passField') passField: ElementRef;
  @ViewChild('showHide') showHide: ElementRef;

  isLoading = false;
  shown = false;
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  togglePassword() {
    this.shown = !this.shown;
    if (this.shown) {
      this.passField.nativeElement.setAttribute('type', 'text');
      this.showHide.nativeElement.setAttribute('class', 'far fa-eye-slash');
    } else {
      this.passField.nativeElement.setAttribute('type', 'password');
      this.showHide.nativeElement.setAttribute('class', 'far fa-eye');
    }
  }

  onLogin(form: NgForm) {
    this.isLoading = true;
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
}
