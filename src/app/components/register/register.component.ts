import { Component, OnInit } from '@angular/core';

// para novegar por la url
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public title: string;
  public user: User;
  public error: boolean;
  public spinner: boolean;
  public roles: any;
  public default: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {
    this.title = 'Registrar Usuario';
    this.user = new User('','','','','','','',true,true);
    this.error = false;
    this.spinner = false;
    this.default = 'USER_ROLE';

    this.roles = [
      {value: 'ADMIN_ROLE', name: 'Administrador'},
      {value: 'USER_ROLE', name: 'Usuario'},
      {value: 'VENTAS_ROLE', name: 'Ventas'}];
   }


  ngOnInit(): void {

    this.user.role = 'admin';
  }


  closetModal( e:any, form:any ){


    this.spinner = true;
      this._userService.createUser( this.user ).subscribe( response => {

      if( response ){
        console.log( response )
        form.reset();
        this.spinner = false;

        this._router.navigate(['/login']);
      }
    },
    error => {
      console.log( error );
      this.error = true;
      this.spinner = false;
    });
  }


  setError(){
    this.error = false;
  }
}
