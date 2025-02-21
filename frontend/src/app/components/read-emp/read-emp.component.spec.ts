import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadEmpComponent } from './read-emp.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AreaService } from '../../services/area.service';

describe('ReadEmpComponent', () => {
  let component: ReadEmpComponent;
  let fixture: ComponentFixture<ReadEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadEmpComponent],
      providers: [AreaService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const headerEl = compiled.querySelector('h4>span');
    expect(headerEl).toBeInstanceOf(HTMLElement);
    expect(headerEl!.textContent).toContain('Empleados');
  });
});
