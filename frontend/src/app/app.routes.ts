import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'create-employee',
    pathMatch: 'full',
  },
  {
    path: 'create-employee',
    loadComponent: () =>
      import('./components/create-emp/create-emp.component').then(
        (m) => m.CreateEmpComponent
      ),
  },
];
