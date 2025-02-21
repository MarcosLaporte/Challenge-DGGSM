import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmpComponent } from './create-emp.component';
import { EmployeeService } from '../../services/employee.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CreateEmpComponent', () => {
  let component: CreateEmpComponent;
  let fixture: ComponentFixture<CreateEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmpComponent],
      providers: [
        EmployeeService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const headerEl = compiled.querySelector('h4');
    expect(headerEl).toBeInstanceOf(HTMLElement);
    expect(headerEl!.textContent).toBe('Alta de empleado');
  });
});
