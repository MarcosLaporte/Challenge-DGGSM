import { TestBed } from '@angular/core/testing';
import { EMPLOYEE_API_PATH, EmployeeService } from './employee.service';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

const mockEmployees = [
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

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmployeeService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('API Requests', () => {
    it('should return mock employee list', (done) => {
      service.getAll().subscribe((res) => {
        expect(res).toEqual(mockEmployees);
        done();
      });

      const req = httpMock.expectOne(EMPLOYEE_API_PATH);
      expect(req.request.method).toBe('GET');
      req.flush(mockEmployees);
    });

    it('should return mock employee', (done) => {
      const idNo = 22428779;
      const selEmployee = mockEmployees.filter(
        (employee) => employee.idNo === idNo
      )[0];

      service.get(idNo).subscribe((res) => {
        expect(res).toEqual(selEmployee);
        done();
      });

      const req = httpMock.expectOne(`${EMPLOYEE_API_PATH}/${idNo}`);
      expect(req.request.method).toBe('GET');
      req.flush(selEmployee);
    });

    it('should create a new employee', (done) => {
      const newEmployee = {
        fullName: 'Test Employee',
        idNo: 22428779,
        birthDate: '1999-01-01',
        isDev: true,
        description: 'Mock employee for test',
        areaId: 101,
      };
      const mockResponse = { insertId: 22428779 };

      service.post(newEmployee).subscribe((res) => {
        expect(res).toEqual(mockResponse);
        done();
      });

      const req = httpMock.expectOne(EMPLOYEE_API_PATH);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newEmployee);

      req.flush(mockResponse);
    });

    it('should delete an employee', (done) => {
      const idNo = 22428779;
      const mockResponse = { affectedRows: 1 };

      service.delete(idNo).subscribe((res) => {
        expect(res).toEqual(mockResponse);
        done();
      });

      const req = httpMock.expectOne(`${EMPLOYEE_API_PATH}/${idNo}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });

    it('should modify an employee', (done) => {
      const idNo = 22428779;
      const employeeModif = { employee: 'UPDATED Test Employee' };
      const mockResponse = { affectedRows: 1 };

      service.put(idNo, employeeModif).subscribe((res) => {
        expect(res).toEqual(mockResponse);
        done();
      });

      const req = httpMock.expectOne(`${EMPLOYEE_API_PATH}/${idNo}`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockResponse);
    });
  });
});
