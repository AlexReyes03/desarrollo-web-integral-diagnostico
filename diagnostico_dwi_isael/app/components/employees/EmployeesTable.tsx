'use client';

import { deleteEmployee } from '../../actions';
import type { EmployeesEditingState, EmployeesTableRow } from './types';
import { formatCurrencyMx } from './format';

type Props = {
  employees: EmployeesTableRow[];
  onEdit: (editing: EmployeesEditingState) => void;
};

export default function EmployeesTable({ employees, onEdit }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-5 py-4">
        <h2 className="text-base font-semibold">Registros</h2>
        <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300">
          {employees.length} total
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[920px]">
          <thead className="bg-slate-950/60 text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3">Nombre</th>
              <th className="px-5 py-3">Apellido</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Departamento</th>
              <th className="px-5 py-3">Sueldo</th>
              <th className="px-5 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {employees.map((e) => (
              <tr key={e.id} className="hover:bg-slate-950/40">
                <td className="px-5 py-4 text-sm font-medium text-slate-100">{e.firstName}</td>
                <td className="px-5 py-4 text-sm text-slate-200">{e.lastName}</td>
                <td className="px-5 py-4 text-sm text-slate-200">{e.email}</td>
                <td className="px-5 py-4 text-sm text-slate-200">{e.department}</td>
                <td className="px-5 py-4 text-sm text-slate-200">{formatCurrencyMx(e.salary)}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onEdit({
                          id: e.id,
                          firstName: e.firstName,
                          lastName: e.lastName,
                          email: e.email,
                          department: e.department,
                          salary: String(e.salary),
                        })
                      }
                      className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-900"
                    >
                      Editar
                    </button>

                    <form
                      action={deleteEmployee.bind(null, e.id)}
                      onSubmit={(ev) => {
                        if (
                          !window.confirm(
                            `¿Eliminar a ${e.firstName} ${e.lastName}? Esta acción no se puede deshacer.`,
                          )
                        ) {
                          ev.preventDefault();
                        }
                      }}
                    >
                      <button
                        type="submit"
                        className="rounded-lg border border-rose-900/60 bg-rose-950/40 px-3 py-1.5 text-xs font-semibold text-rose-200 hover:bg-rose-950/60"
                      >
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}

            {employees.length === 0 ? (
              <tr>
                <td className="px-5 py-10 text-center text-sm text-slate-400" colSpan={6}>
                  Sin registros. Crea el primero desde el formulario.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

