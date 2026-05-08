import type { Employee } from '../../generated/prisma/client';

export type EmployeesEditingState = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  salary: string;
};

export type EmployeesFormMode =
  | { kind: 'create' }
  | { kind: 'edit'; editing: EmployeesEditingState };

export type EmployeesTableRow = Employee;

