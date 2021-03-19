import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModel } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth: AuthModel;

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.auth = this.loginForm.value;
    Swal.fire({
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.authService.login(this.auth).subscribe( resp => {
      console.log(resp);
      Swal.close();
      this.router.navigate(['/home']);
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error',
        footer: err.error.error.message
      });
    });
  }

}
