import { Injectable } from '@angular/core';
import { DatabaseService } from './DatabaseService';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../utils';
import { map, Observable } from 'rxjs';

const PATH: string = '/api/employees';
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
    return this.http.get<Employee[]>(PATH).pipe(
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
    throw new Error('Method not implemented.');
  }

  post(data: Employee): Observable<any> {
    return this.http.post(PATH, data);
  }

  put(id: number, newData: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
