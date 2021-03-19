import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: UserModel;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      displayName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
   }

  ngOnInit(): void {
  }

  saveUser() {
    this.user = this.registerForm.value;
    Swal.fire({
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.authService.newUser(this.user).subscribe( resp => {
      Swal.close();
      this.router.navigate(['/login']);
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
