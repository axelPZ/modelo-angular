import { Component, OnInit } from '@angular/core';

// para novegar por la url, y obtener datos de la url
import { Router, ActivatedRoute, Params } from '@angular/router';


import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]

})
export class LoginComponent implements OnInit {

  public title: string;
  public user: User;
  public error: boolean;
  public spinner: boolean;
  public message: string;
  public userSession: any;
  public token: any;

  constructor(
    public _userService: UserService,
    private _route: ActivatedRoute,
    public _router: Router
  ) {
    this.title = "Logearse";
    this.user = new User('','','','','','','',true,true);
    this.error = false;
    this.spinner = false;
    this.message = '';

   }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit( form: any){

    this.spinner= true;
    const { password, email }= this.user;
    this._userService.login( { password, email } ).subscribe ( response => {

      if( response ){
        this._userService.changeSession( response.token, response.user );
        this.spinner=false;
        this._router.navigate(['/inicio']);
      }
    }, error => {

      this.message = error.error.msg;
      this.spinner= false;
      this.error = true;

    })
  }

  //  cerrar session
  logout(){
    // obtener el parametro de la ruta
    this._route.params.subscribe( params => {
      let logout = +params['sure']; // con el + lo convertimos a entero

      if( logout ==1 ){
        localStorage.removeItem('userSession');
        localStorage.removeItem('token');

        this.userSession = null;
        this.token = null;

        // redireccionar a la pagina de inicio
        this._router.navigate(['/login']);
      }
    });
  }

  setError(){
    this.error = false;
  }
}
