import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient) { }

  public getClima(){
      return   this.http.get(`${environment.ApiClima}`);
  }

  public obtenerProvincia(name:any){
    return this.http.get(`${environment.ApiClima}/${name}`);
  }

  public obtenerClima(name1:any, name2:any){
    return this.http.get(`${environment.ApiClima}/${name1}/municipios/${name2}`);
  }
}
