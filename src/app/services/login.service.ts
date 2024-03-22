import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string | null = null;
  logeado: boolean = false;

  constructor() {}

  isAuthenticated(): boolean {
    // Devuelve true si hay un token válido, indicando que el usuario está autenticado
    return this.token !== null && this.logeado;
  }

  iniciarSesion(usuario: string, contrasenia: string): boolean {
    // Lógica para autenticar con la API y obtener un token
    if (usuario === 'admin@gmail.com' && contrasenia === 'Qwerty123') {
      this.token = 'qwerty';
      this.logeado = true;
      return true;
    } else {
      this.token = null;
      this.logeado = false;
      return false;
    }
  }

  cerrarSesion(): void {
    // Lógica para cerrar sesión y eliminar el token
    this.token = null;
    this.logeado = false;
  }

  checkCredentials(usuario: string, contrasenia: string): boolean {
    // Verifica si las credenciales coinciden con las credenciales de administrador
    return usuario === 'admin@gmail.com' && contrasenia === 'Qwerty123';
  }
}
