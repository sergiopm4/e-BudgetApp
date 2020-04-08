import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { MainService } from '../services/main.service'
import { UserService } from '../services/user.service'



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public _mainService: MainService, public _userService: UserService, public formBuilder: FormBuilder, public _router: Router) { }

  loginForm: FormGroup;
  submitted = false;
  loading = false;

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;

    } else {
      this.loading = true;

      this._mainService.login(this.loginForm.value)
        .subscribe((response) => {

          if (response['Message'] === 'Welcome') {
            this._userService.isLogged = true;
            document["cookie"] = `sello=${response["token"]}`;
            localStorage.setItem('token', response["token"]);
            localStorage.setItem('id', response["id"]);
            localStorage.setItem('firstName', response['firstName']);
            localStorage.setItem('lastName', response['lastName']);
            console.log(response)

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Login correcto!',
              showConfirmButton: false,
              timer: 1500
            })


            this._router.navigateByUrl("budget-stats")

          }

          if (response['Error'] === 'PASSWORD_INVALID') {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Contraseña incorrecta',
              // title: this.getLoginError(response['Error']),
              showConfirmButton: false,
              timer: 2000
            })
            setTimeout(() => {
              location.reload();

            }, 1000)
          }

          if (response['Error'] === 'EMAIL_INVALID') {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Email incorrecto',
              // title: this.getLoginError(response['Error']),
              showConfirmButton: false,
              timer: 2000
            })
            setTimeout(() => {
              location.reload();

            }, 1000)
          }

        })

      this.loading = true;

    }
  }



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

}
