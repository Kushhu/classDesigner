import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from '../../signup/signup.service';
import { SignUp } from '../../signup/signup';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { AppRoute } from '../../../class/app-route';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginInfo!: SignUp;
  hide: boolean = true;

  constructor(
    private service: SignupService,
    private formbuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.loginInfo = new SignUp(this.formbuilder);
    this.loginInfo.createForm();
  }

  onSubmit() {
    if (this.loginInfo.form.valid) {
      this.service.login(this.loginInfo.form.value).subscribe({
        next: (data: any) => {
          if (data.IsSuccess) {
            this.userService.setToken(data.Model)
            this.router.navigate([AppRoute.Profile]);
          }
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
  }
}
