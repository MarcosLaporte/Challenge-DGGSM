import { Component, inject } from '@angular/core';
import { Area, Employee } from '../../utils';
import { DatePipe } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-read-emp',
  imports: [DatePipe],
  templateUrl: './read-emp.component.html',
  styleUrl: './read-emp.component.scss',
})
export class ReadEmpComponent {
  private employees: Employee[] = [];
  private areas: Area[] = [];
  readonly areaMap: Map<number, string> = new Map();

  constructor() {
    inject(EmployeeService)
      .getAll()
      .subscribe((employees) => (this.employees = employees));
    inject(AreaService)
      .getAll()
      .subscribe((areas) =>
        areas.forEach((a) => {
          this.areaMap.set(a.id, a.area);
        })
      );
  }

  public getEmployees = () => this.employees;
}
