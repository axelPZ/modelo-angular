import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ UserService ]
})
export class HomeComponent implements OnInit {
  public users: any;
  public title: string;
  public userSession: any;
  public token: string;
  public spinner: boolean;

  constructor(
    public _userService: UserService
  ) {
    this.title = 'Todos los usuarios';
    this.userSession = _userService.getUserSession();
    this.token = _userService.getToken();
    this.spinner = false;
   }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){

    this.spinner = true;
    this._userService.getAll().subscribe( response => {
      if( response ){
        this.users = response.users;
        this.spinner = false;
      }
    }, error => {
      console.log( error );
      this.spinner = false;
    })
  }

  deleteUser( id:string ){

    this.spinner = true;
    this._userService.deleteUser( this.token, id).subscribe( response =>{
      if( response ){
        this.getAllUsers();
      }
    }, error => {
      console.log( error );
      this.spinner = true;
    })
  }

  searchData( e:any ){

    const data =  e.target.parentElement.children[0].value;
    this.spinner = true;
    this._userService.search( data ).subscribe( response => {

      if( response ){
        this.users = response.results;
        this.spinner = false;

      }
    }, error => {
      console.log( error );
      this.spinner = false;

    })
  }

}
