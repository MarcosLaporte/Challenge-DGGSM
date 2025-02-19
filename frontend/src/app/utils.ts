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
