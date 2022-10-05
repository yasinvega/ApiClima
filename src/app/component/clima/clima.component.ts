import { Component, Input, OnInit } from '@angular/core';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Route, Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NgFor } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { observable } from 'rxjs';
import Swal from 'sweetalert2';
// Google Maps de angular
import { GoogleMapsModule } from '@angular/google-maps';



@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {


  public clima: any;
  public cod_prov_seleccionada: any;
  public detallesMuni: any;
  public cod_mun_seleccionado: any;
  public detallesClima: Array<any> = [];



  public lati:any;
  public longi:any;

  constructor(private apiService: ApiService ) {}

  ngOnInit(): void {
    this.todoClima();
  }



  public todoClima(){
      this.apiService.getClima().subscribe(
        resp => {
            this.clima = resp;
        }
      )
  }

  public obtenerId(){
    this.obtenerMunicipios(this.cod_prov_seleccionada)
  }

  public obtenerMunicipios(name: any){
    this.apiService.obtenerProvincia(name).subscribe(
      (resp1:any) => {
      this.detallesMuni = resp1;
    });
  }

   public verDetalles(){
      // this.router.navigate(['/detalles', this.cod_prov_seleccionada, this.cod_mun_seleccionado])
      this.apiService.obtenerClima(this.cod_prov_seleccionada, this.cod_mun_seleccionado).subscribe(
       (resp:any) => {
        this.detallesClima = [resp];
      },
      (error) =>{
        Swal.fire({
          title: 'Error!',
          text: 'Selecciona Provincia y/o Ciudad.',
          icon: 'error',
          confirmButtonText: 'OK',
          target: 'contenedor_principal'
        })
      }
      );
   }
}


