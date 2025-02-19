import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadEmpComponent } from './read-emp.component';

describe('ReadEmpComponent', () => {
  let component: ReadEmpComponent;
  let fixture: ComponentFixture<ReadEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadEmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
