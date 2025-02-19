import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'read-employees',
    pathMatch: 'full',
  },
  {
    path: 'create-employee',
    loadComponent: () =>
      import('./components/create-emp/create-emp.component').then(
        (m) => m.CreateEmpComponent
      ),
  },
  {
    path: 'read-employees',
    loadComponent: () =>
      import('./components/read-emp/read-emp.component').then(
        (m) => m.ReadEmpComponent
      ),
  },
];
