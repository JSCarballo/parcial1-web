import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-listar-vehiculo',
  templateUrl: './listar-vehiculo.component.html',
  styleUrls: ['./listar-vehiculo.component.css']
})
export class ListarVehiculoComponent implements OnInit {

  vehiculos: Array<Vehiculo> = [];
  nMarcas: { [marca: string]: number } = {};

  constructor(private vehiculoService: VehiculoService) { }

  getVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe((vehiculos) => {
        this.vehiculos = vehiculos;
        this.contarMarcas();
      });
  }

  private contarMarcas(): void {
    const counts: { [marca: string]: number } = {};

    for (const v of this.vehiculos) {
      counts[v.marca] = (counts[v.marca] ?? 0) + 1;
    }

    this.nMarcas = counts;
  }

  compareByKey(a: KeyValue<string, number>, b: KeyValue<string, number>) {
    return a.key.localeCompare(b.key);
  }


  ngOnInit() {
    this.getVehiculos();
  }
}
