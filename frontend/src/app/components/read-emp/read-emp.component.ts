import { Component } from '@angular/core';
import { Area, Employee } from '../../utils';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-read-emp',
  imports: [DatePipe],
  templateUrl: './read-emp.component.html',
  styleUrl: './read-emp.component.scss',
})
export class ReadEmpComponent {
  readonly employees: Employee[]; //TODO:
  private readonly areas: Area[]; //TODO:
  readonly areaMap: Map<number, string>;

  constructor() {
    this.employees = [
      {
        fullName: 'Katrina Ríos',
        idNo: 22428779,
        birthDate: '1972-03-30T03:00:00.000Z',
        isDev: true,
        description: 'Arquitecta de software con amplia trayectoria.',
        areaId: 105,
      },
      {
        fullName: 'Rolando Fernández',
        idNo: 24178141,
        birthDate: '1974-08-20T03:00:00.000Z',
        isDev: false,
        description: 'Gerente de logística con más de 20 años de experiencia.',
        areaId: 102,
      },
      {
        fullName: 'Beatriz López',
        idNo: 25614551,
        birthDate: '1976-05-15T03:00:00.000Z',
        isDev: false,
        description: 'Especialista en recursos humanos.',
        areaId: 101,
      },
      {
        fullName: 'Tomás Pérez',
        idNo: 33709320,
        birthDate: '1990-06-12T03:00:00.000Z',
        isDev: false,
        description: 'Encargado de atención al cliente.',
        areaId: 106,
      },
      {
        fullName: 'Marilén Suárez',
        idNo: 41872423,
        birthDate: '2003-05-18T03:00:00.000Z',
        isDev: true,
        description: 'Desarrolladora de aplicaciones móviles.',
        areaId: 107,
      },
      {
        fullName: 'Bruno Herrera',
        idNo: 41935663,
        birthDate: '2003-07-25T03:00:00.000Z',
        isDev: false,
        description: 'Analista financiero en formación.',
        areaId: 104,
      },
      {
        fullName: 'Diana Méndez',
        idNo: 44226347,
        birthDate: '2006-02-10T03:00:00.000Z',
        isDev: true,
        description: 'Desarrolladora junior en frontend.',
        areaId: 103,
      },
    ];
    this.areas = [
      {
        id: 101,
        area: 'RRHH',
      },
      {
        id: 102,
        area: 'Logística',
      },
      {
        id: 103,
        area: 'Desarrollo Web',
      },
      {
        id: 104,
        area: 'Desarrollo Backend',
      },
      {
        id: 105,
        area: 'Finanzas',
      },
      {
        id: 106,
        area: 'Arquitectura de Software',
      },
      {
        id: 107,
        area: 'Atención al Cliente',
      },
      {
        id: 108,
        area: 'Desarrollo Móvil',
      },
    ];

    this.areaMap = new Map();
    this.areas.forEach((a) => {
      this.areaMap.set(a.id, a.area);
    });
  }
}
