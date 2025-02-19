import Swal from 'sweetalert2';

export type Area = {
  id: number;
  area: string;
};

export type Employee = {
  fullName: string;
  idNo: number;
  birthDate: Date | string;
  isDev: boolean;
  description: string;
  areaId: number;
};

export const ToastSuccess = Swal.mixin({
  icon: 'success',
  background: '#a5dc86',
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  showConfirmButton: false,
  timer: 3000,
});

export const ToastError = Swal.mixin({
  icon: 'error',
  background: '#f27474',
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  showConfirmButton: false,
  timer: 5000,
});

export const Loader = Swal.mixin({
  allowEscapeKey: false,
  allowOutsideClick: false,
  didOpen: () => {
    Swal.showLoading();
  },
});
