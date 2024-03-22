import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../services/login.service'; // Importa el servicio LoginService

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  email: string = '';
  password: string = '';
  emailValid: boolean = true;
  passwordValid: boolean = true;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loginService: LoginService
  ) {}

  validateEmail() {
    this.emailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.email);
  }

  validatePassword() {
    this.passwordValid = /^(?=.*[A-Z]).{8,}$/.test(this.password);
  }

  async login(registering: boolean = false) {
     if (this.email.trim() !== '' && this.password.trim() !== '') {
       if (this.emailValid && this.passwordValid) {
         if (this.loginService.iniciarSesion(this.email, this.password)) {
           this.router.navigateByUrl('/perfil');
        } else {
           this.showAlert('Credenciales inválidas', 'Por favor, verifica tu correo y contraseña.');
        }
      } else {
         if (!registering) {
          this.showAlert('Credenciales inválidas', 'Por favor, verifica tu correo y contraseña.');
        }
      }
    } else {
       this.showAlert('Campos vacíos', 'Por favor, completa todos los campos.');
    }
  }  

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}