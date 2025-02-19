import { CommonModule, formatDate } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Area } from '../../utils';

@Component({
  selector: 'app-create-emp',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-emp.component.html',
  styleUrl: './create-emp.component.scss',
  standalone: true,
})
export class CreateEmpComponent {
  employeeForm: FormGroup;
  readonly areas: Area[];

  constructor() {
    this.areas = []; //TODO: Retrieve data from db

    this.employeeForm = inject(FormBuilder).group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[\p{L}\p{M}]+([ -][\p{L}\p{M}]+)+$/u),
            Validators.maxLength(127),
          ],
        ],
        idNo: [
          0,
          [
            Validators.required,
            Validators.min(1000000),
            Validators.max(99999999),
          ],
        ],
        dob: [
          this.currentDate(),
          [Validators.required, this.noFutureDateValidator],
        ],
        isDev: false,
        description: ['', Validators.required, Validators.maxLength(255)],
        areaId: [-1, [Validators.required, Validators.min(1)]],
      },
      { updateOn: 'blur' }
    );
  }

  private noFutureDateValidator(control: AbstractControl): null | object {
    const date = new Date(<string>control.value);

    if (date > new Date()) return { isFutureDate: true };

    return null;
  }

  protected currentDate = () => formatDate(new Date(), 'yyyy-MM-dd', 'en');

  protected submitEmployee() {
    //TODO:
  }
}
