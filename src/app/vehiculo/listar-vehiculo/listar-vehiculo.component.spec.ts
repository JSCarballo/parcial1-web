/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { of } from 'rxjs';

import { ListarVehiculoComponent } from './listar-vehiculo.component';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';

describe('ListarVehiculoComponent', () => {
  let component: ListarVehiculoComponent;
  let fixture: ComponentFixture<ListarVehiculoComponent>;
  let debug: DebugElement;

  // Datos de prueba NUEVOS (no usados en el ejemplo del parcial)
  const vehiculosData: Vehiculo[] = [
    new Vehiculo(1, 'Toyota',  'Corolla',  'Corolla', 2020, 15000, 'Plateado', 'img1'),
    new Vehiculo(2, 'Mazda',   'Mazda 3',  'Mazda 3', 2019, 22000, 'Azul',     'img2'),
    new Vehiculo(3, 'Subaru',  'Forester', 'Forester',2018, 35000, 'Verde',    'img3'),
  ];

  // Mock del servicio
  const vehiculoServiceMock = {
    getVehiculos: jasmine.createSpy('getVehiculos').and.returnValue(of(vehiculosData))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ListarVehiculoComponent],
      providers: [{ provide: VehiculoService, useValue: vehiculoServiceMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVehiculoComponent);
    component = fixture.componentInstance;

    // Evita error si el template usa "keyvalue: compareByKey"
    (component as any).compareByKey = (a: KeyValue<string, number>, b: KeyValue<string, number>) =>
      a.key.localeCompare(b.key);

    // Totales opcionales para esa sección del template
    component.nMarcas = { Toyota: 1, Mazda: 1, Subaru: 1 };

    fixture.detectChanges(); // carga vehiculosData en ngOnInit()
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar 1 fila de encabezado', () => {
    expect(debug.queryAll(By.css('table thead tr'))).toHaveSize(1);
    expect(debug.queryAll(By.css('table thead th'))).toHaveSize(4);
  });

  it('debe renderizar 3 filas en el cuerpo (tbody)', () => {
    const bodyRows = debug.queryAll(By.css('table tbody tr'));
    expect(bodyRows).toHaveSize(3);
  });

  it('la primera fila debe mostrar los datos del primer vehículo', () => {
    const firstRow = debug.queryAll(By.css('table tbody tr'))[0];
    const tds = firstRow.queryAll(By.css('td')); // [#, Marca, Línea, Modelo]
    expect(tds[1].nativeElement.textContent).toContain('Toyota');
    expect(tds[2].nativeElement.textContent).toContain('Corolla');
    expect(tds[3].nativeElement.textContent).toContain('2020');
  });
});
