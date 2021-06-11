import { Injectable } from "@angular/core";

// el CanActivate es el que nos va ayudar para que no se pueda acceder a las rutas si no se esta logeado
import { Router, CanActivate } from "@angular/router";

import { UserService } from "./user";

@Injectable() export class IdentityGuard implements CanActivate{

  constructor(
    private _router: Router,
    private _userService: UserService
  ){}

  canActivate(){

    const userSession = this._userService.getUserSession();
    // se podria crear una funcion que vaya a verificar el token al servidor

    if( userSession.name ){
      return true;
    }else {
      this._router.navigate(['/login']);
      return false;
    }


  }
}
