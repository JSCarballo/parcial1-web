import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';

@Component({
  selector: 'app-listar-vehiculo',
  templateUrl: './listar-vehiculo.component.html',
  styleUrls: ['./listar-vehiculo.component.css']
})
export class ListarVehiculoComponent implements OnInit {

  vehiculos: Array<Vehiculo> = [];

  constructor() { }

  ngOnInit() {
  }

}
