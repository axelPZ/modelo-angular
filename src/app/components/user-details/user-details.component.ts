import { Component, OnInit } from '@angular/core';

// para novegar por la url, y obtener datos de la url
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [UserService]

})
export class UserDetailsComponent implements OnInit {

  public idUser: string;
  public user: any;
  public spinner: boolean;

  constructor(

    public _router: Router,
    public _route: ActivatedRoute,
    public _userService: UserService,
  ) {
    this.user = new User('','','','','','','',true,true);
    this.idUser = '';
    this.spinner = false;
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

}
