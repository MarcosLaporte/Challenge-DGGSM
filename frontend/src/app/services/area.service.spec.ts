import { TestBed } from '@angular/core/testing';
import { AreaService, AREA_API_PATH } from './area.service';
import { provideHttpClient } from '@angular/common/http';
import { Area } from '../utils';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

const mockAreas: Area[] = [
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

describe('AreaService', () => {
  let service: AreaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AreaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('API Requests', () => {
    it('should return mock area list', (done) => {
      service.getAll().subscribe((res) => {
        expect(res).toEqual(mockAreas);
        done();
      });

      const req = httpMock.expectOne(AREA_API_PATH);
      expect(req.request.method).toBe('GET');
      req.flush(mockAreas);
    });

    it('should return mock area', (done) => {
      const id = 101;
      const selArea = mockAreas.filter((area) => area.id === id)[0];

      service.get(id).subscribe((res) => {
        expect(res).toEqual(selArea);
        done();
      });

      const req = httpMock.expectOne(`${AREA_API_PATH}/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(selArea);
    });

    it('should create a new area', (done) => {
      const newArea = { id: -1, area: 'Test Area' };
      const mockResponse = { insertId: 109 };

      service.post(newArea).subscribe((res) => {
        expect(res).toEqual(mockResponse);
        done();
      });

      const req = httpMock.expectOne(AREA_API_PATH);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newArea);

      req.flush(mockResponse);
    });

    it('should delete an area', (done) => {
      const id = 101;
      const mockResponse = { affectedRows: 1 };

      service.delete(id).subscribe((res) => {
        expect(res).toEqual(mockResponse);
        done();
      });

      const req = httpMock.expectOne(`${AREA_API_PATH}/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });

    it('should modify an area', (done) => {
      const id = 101;
      const areaModif = { area: 'UPDATED Test Area' };
      const mockResponse = { affectedRows: 1 };

      service.put(id, areaModif).subscribe((res) => {
        expect(res).toEqual(mockResponse);
        done();
      });

      const req = httpMock.expectOne(`${AREA_API_PATH}/${id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockResponse);
    });
  });
});
