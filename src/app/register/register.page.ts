import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonInput,
  IonButton,
  IonSpinner,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../config/fire';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    IonContent,
    FormsModule,
    ReactiveFormsModule,
    IonInput,
    IonButton,
    IonSpinner,
  ],
})
export class RegisterPage implements OnInit {
  formRegister!: FormGroup;
  isValidInput: boolean = false;
  errorMessage: string = '';
  spinner: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.formRegister = this.formBuilder.group({
      names: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  public async createUser() {
    if (this.formRegister.get('password')?.invalid) {
      this.errorMessage = 'La contraseña debe tener minimo 6 caracteres';
      this.isValidInput = true;
      console.log(this.errorMessage);
      return;
    }

    if (this.formRegister.get('email')?.invalid) {
      this.errorMessage = 'El email no es valido';
      this.isValidInput = true;
      return;
    }

    if (this.formRegister.get('names')?.invalid) {
      this.errorMessage = 'Debe ingresar su nombre';
      this.isValidInput = true;
      return;
    }

    this.spinner = true;
    createUserWithEmailAndPassword(
      auth,
      this.formRegister.value.email,
      this.formRegister.value.password
    )
      .then(async (res) => {
        await updateProfile(getAuth().currentUser!, {
          displayName: this.formRegister.value.names,
        });
        const user = {
          displayName: res.user.displayName,
          email: res.user.displayName,
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.formRegister.reset();
        this.isValidInput = false;
        this.spinner = false;
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        this.errorMessage = 'El usuario con este email ya existe';
        this.isValidInput = true;
        this.spinner = false;
      });
  }
}
