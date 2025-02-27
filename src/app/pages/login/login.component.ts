import { Component, effect, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!: FormGroup;
  errorMessage: string = "";
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  login() {
    this.authService.login(this.form.value).subscribe({
      next: res => {
        this.authService.saveToken(res.token, res.user);
        this.toastr.success('Login Realizado com Sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.errorMessage = `${err}`;
        console.log(err);
        
        this.toastr.error(`${err.error.error}`);
      }
    })
  }

}
