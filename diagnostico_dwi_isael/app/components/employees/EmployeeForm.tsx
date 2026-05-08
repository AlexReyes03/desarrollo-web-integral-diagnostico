'use client';

import { useActionState, useEffect, useMemo } from 'react';
import { createEmployee, updateEmployee } from '../../actions';
import { initialEmployeeActionState } from '../../employee-action-state';
import type { EmployeesEditingState } from './types';

type Props = {
  editing: EmployeesEditingState | null;
  onCancelEdit: () => void;
};

export default function EmployeeForm({ editing, onCancelEdit }: Props) {
  const action = useMemo(() => {
    if (!editing) return createEmployee;
    return updateEmployee.bind(null, editing.id);
  }, [editing]);

  const [state, formAction] = useActionState(action, initialEmployeeActionState);

  const formTitle = editing ? 'Editar empleado' : 'Registrar empleado';
  const submitLabel = editing ? 'Guardar cambios' : 'Registrar';

  useEffect(() => {
    if (editing && state.ok) onCancelEdit();
  }, [editing, state.ok, onCancelEdit]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">{formTitle}</h2>
      </div>

      <form
        action={formAction}
        className="space-y-4"
        onSubmit={(e) => {
          if (editing) {
            if (!window.confirm('¿Guardar los cambios de este empleado?')) {
              e.preventDefault();
            }
          }
        }}
      >
        <div className="space-y-1.5">
          <label
            htmlFor="firstName"
            className="text-xs font-medium text-slate-300"
            title="Este campo es obligatorio"
          >
            Nombre*
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            defaultValue={editing?.firstName ?? ''}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-slate-500"
            placeholder="Ingresa el nombre del empleado"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="lastName"
            className="text-xs font-medium text-slate-300"
            title="Este campo es obligatorio"
          >
            Apellido*
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            defaultValue={editing?.lastName ?? ''}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-slate-500"
            placeholder="Ingresa el apellido del empleado"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-medium text-slate-300"
            title="Este campo es obligatorio"
          >
            Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={editing?.email ?? ''}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-slate-500"
            placeholder="Ingresa el correo electrónico del empleado"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="department"
            className="text-xs font-medium text-slate-300"
            title="Este campo es obligatorio"
          >
            Departamento*
          </label>
          <input
            id="department"
            name="department"
            required
            defaultValue={editing?.department ?? ''}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-slate-500"
            placeholder="Ingresa el departamento del empleado"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="salary"
            className="text-xs font-medium text-slate-300"
            title="Este campo es obligatorio"
          >
            Sueldo*
          </label>
          <input
            id="salary"
            name="salary"
            required
            inputMode="decimal"
            defaultValue={editing?.salary ?? ''}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-slate-500"
            placeholder="Ingresa el sueldo del empleado"
          />
        </div>

        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            type="submit"
            className="inline-flex h-10 min-w-32 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            {submitLabel}
          </button>
          {editing ? (
            <button
              type="button"
              onClick={onCancelEdit}
              className="inline-flex h-10 min-w-32 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-4 text-sm font-semibold text-slate-200 hover:bg-slate-800"
            >
              Cancelar
            </button>
          ) : null}
        </div>

        {!state.ok && state.message ? (
          <p className="rounded-xl border border-rose-900/60 bg-rose-950/30 px-3 py-2 text-xs text-rose-200">
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}

