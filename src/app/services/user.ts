//importar el injectable para poder utilizar el servicio en otros lados
import { Injectable } from "@angular/core";
// el Httpclient para hacer las peticiones AJAXX
import { HttpClient, HttpHeaders } from "@angular/common/http";
// obsservable para obtener la respuesta del AJAX
import { Observable } from 'rxjs';

import { global } from "./global";


@Injectable() export class UserService {

  private url: string;
  public token: string;
  public userSession: string;
  public identity: any;

  constructor(
    public _http: HttpClient
  ){
    this.url = global.URL;
    this.token='';
    this.userSession='';
  }

  changeSession( token:string, user:any ){
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'userSession', JSON.stringify(user));
  }

  createUser( user:any ):Observable<any> {
    const params = JSON.stringify( user );
    const headers = new HttpHeaders().set( 'Content-Type','application/json');
    return this._http.post( this.url +'/api/users', params, { headers: headers} );
  }

  login( user: any ):Observable<any> {
    const params = JSON.stringify( user );
    const headers = new HttpHeaders().set( 'Content-Type','application/json');
    return this._http.post( this.url +'/api/auth/login', params, { headers: headers} );
  }

  getToken(){
      const token = localStorage.getItem( 'token' );
      return this.token = ( token!= undefined ) ? token : '';
  }

  getUserSession(){
    const user = JSON.parse( localStorage.getItem('userSession')!);
    return this.userSession = ( user!= undefined ) ? user : {};
  }

  getAll():Observable<any>{
    return this._http.get( this.url +'/api/users');
  }

  getById( id: string ):Observable<any>{
    return this._http.get( this.url +'/api/users/' + id );
  }

  deleteUser( token: string, id: string ):Observable<any>{

      let headers = new HttpHeaders().set('Content-Type','application/json')
                                     .set('x-token',token);

    return this._http.delete( this.url +'/api/users/' + id, { headers: headers } );
  }


 updateUserImg ( avatar: File, uidUser: string ): Observable<any>{
  const formData = new FormData();
  formData.append('archivo',avatar, avatar.name);

  return this._http.put(this.url+'/api/uploads/users/'+uidUser,formData);
}

 updateUser( user: any ): Observable<any>{

  const params = JSON.stringify( user );
  const headers = new HttpHeaders().set( 'Content-Type','application/json');
  return this._http.put( this.url +'/api/users/'+user.uid, params, { headers: headers} );
 }

 search( data: string ): Observable<any> {
   // /api/search/users/mo
   return this._http.get( this.url +'/api/search/users/'+data );
 }

}
