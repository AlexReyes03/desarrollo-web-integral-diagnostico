'use client';

import { useState } from 'react';
import EmployeeForm from './employees/EmployeeForm';
import EmployeesTable from './employees/EmployeesTable';
import type { EmployeesEditingState, EmployeesTableRow } from './employees/types';

type Props = {
  employees: EmployeesTableRow[];
};

export default function EmployeesManager({ employees }: Props) {
  const [editing, setEditing] = useState<EmployeesEditingState | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <header className="mb-8 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Empleados de Rocket Code 🚀</h1>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="lg:col-span-4">
            <EmployeeForm
              key={editing ? `edit-${editing.id}` : 'create'}
              editing={editing}
              onCancelEdit={() => setEditing(null)}
            />
          </section>

          <section className="lg:col-span-8">
            <EmployeesTable employees={employees} onEdit={setEditing} />
          </section>
        </div>
      </div>
    </div>
  );
}

