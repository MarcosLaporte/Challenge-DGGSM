import { Injectable } from '@angular/core';
import { DatabaseService } from './DatabaseService';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../utils';
import { map, Observable } from 'rxjs';

export const EMPLOYEE_API_PATH: string = '/api/employees';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements DatabaseService<Employee> {
  constructor(private http: HttpClient) {}

  private isEmployee(data: any): boolean {
    return (
      data.hasOwnProperty('fullName') &&
      data.hasOwnProperty('idNo') &&
      data.hasOwnProperty('birthDate') &&
      data.hasOwnProperty('isDev') &&
      data.hasOwnProperty('description') &&
      data.hasOwnProperty('areaId')
    );
  }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(EMPLOYEE_API_PATH).pipe(
      map((res) =>
        res
          .filter((el) => this.isEmployee(el))
          .map((el) => ({
            fullName: el.fullName,
            idNo: el.idNo,
            birthDate: el.birthDate,
            isDev: el.isDev,
            description: el.description,
            areaId: el.areaId,
          }))
      )
    );
  }

  get(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${EMPLOYEE_API_PATH}/${id}`);
  }

  post(data: Employee): Observable<any> {
    return this.http.post(EMPLOYEE_API_PATH, data);
  }

  put(id: number, newData: any): Observable<any> {
    if (newData.hasOwnProperty('idNo'))
      console.warn('El ID del empleado no puede modificarse.');

    return this.http.put(`${EMPLOYEE_API_PATH}/${id}`, newData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${EMPLOYEE_API_PATH}/${id}`);
  }
}
