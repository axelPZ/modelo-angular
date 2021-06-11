import { Component, OnInit } from '@angular/core';

// para novegar por la url, y obtener datos de la url
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]

})
export class UserEditComponent implements OnInit {

  public idUser: string;
  public user: any;
  public spinner: boolean;
  public spinnerImg: boolean;
  public error: boolean;
  public roles: any;
  public fileUpload: any;
  public userSession: any;
  public token: string;

  constructor(

    public _router: Router,
    public _route: ActivatedRoute,
    public _userService: UserService,
  ) {

    this.user = new User('','','','','','','',true,true);
    this.idUser = '';
    this.spinner = false;
    this.spinnerImg = false;
    this.error = false;
    this.userSession = _userService.getUserSession();
    this.token = _userService.getToken();
    this.roles = [
      {value: 'ADMIN_ROLE', name: 'Administrador'},
      {value: 'USER_ROLE', name: 'Usuario'},
      {value: 'VENTAS_ROLE', name: 'Ventas'}];
   }

  ngOnInit(): void {

    this.getId();
  }

  getId(){
    this.spinner = true;
    this._route.params.subscribe( params =>{

      const idUser = params['id'].trim();
      if( idUser ){
        this.idUser = idUser;
        this.getUser();
      }
    });
  }

  getUser(){

    this._userService.getById( this.idUser ).subscribe( response => {
      if( response ){
        this.user = response.user;
        this.spinner = false;
      }
    }, error => {
      console.log( error );
      this.spinner = false;
    })
  }

  editUser( e:any, form:any ){

    this.spinner = true;
    this._userService.updateUser( this.user ).subscribe( response => {

      if( response ){
        this.user = response.user;
        this.userSession = this.user;
        this._userService.changeSession( this.token, this.userSession );
        this.spinner = false;

      }
    }, error => {
      console.log( error );
      this.spinner = false;
    })
  }

  uploadFile(e:any){

    this.spinnerImg = true;
    this.fileUpload = e.files[0];
    this._userService.updateUserImg( this.fileUpload, this.userSession.uid ).subscribe(

      response =>{

        this.spinnerImg = false;
        this.user.img = response.model.img;
        this.userSession = this.user;
        this._userService.changeSession( this.token, this.userSession );
      }, error => {
        console.log( error );
        this.spinnerImg = false;

      }
    )

  }

  setError(){
    this.error = false;
  }
}
