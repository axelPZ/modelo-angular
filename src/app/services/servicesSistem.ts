//importar el injectable para poder utilizar el servicio en otros lados
import { Injectable } from "@angular/core";
// el Httpclient para hacer las peticiones AJAXX
import { HttpClient, HttpHeaders } from "@angular/common/http";
// obsservable para obtener la respuesta del AJAX
import { Observable } from 'rxjs';


@Injectable() export class ServicesSistem {

  private spinner: boolean;

  constructor()
  {
    this.spinner = false;
  }

  viewSpinner( state: boolean ){
   this.spinner = state;
   return this.spinner;
  }

  getSpinner(){

    if( this.spinner ){
      return true;
    }else{
      return false;
    }
  }

}
