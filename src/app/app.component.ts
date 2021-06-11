import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent implements OnInit, DoCheck{
  public title: string;
  public token: any;
  public userSession: any;
  public users: any;

  constructor(
    public _userService: UserService
  ){
    this.title = 'modelo-angular';
    this.loadUser();
  }

  ngOnInit(){
    this.loadUser();
  }
  ngDoCheck(){
    this.loadUser();

  }

  loadUser(){
    this.token = this._userService.getToken();
    this.userSession = this._userService.getUserSession();
  }


}
