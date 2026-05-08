'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from './generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import type { EmployeeActionState } from './employee-action-state';

const globalForPrisma = globalThis as unknown as { prismaEmployee?: PrismaClient };

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
});

const prisma =
  globalForPrisma.prismaEmployee ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaEmployee = prisma;

const getString = (formData: FormData, key: string): string => {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
};

const getNumber = (formData: FormData, key: string): number | null => {
  const raw = getString(formData, key);
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
};

export async function getEmployees() {
  return prisma.employee.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createEmployee(
  _prevState: EmployeeActionState,
  formData: FormData,
): Promise<EmployeeActionState> {
  const firstName = getString(formData, 'firstName');
  const lastName = getString(formData, 'lastName');
  const email = getString(formData, 'email').toLowerCase();
  const department = getString(formData, 'department');
  const salary = getNumber(formData, 'salary');

  if (!firstName || !lastName || !email || !department || salary === null || salary < 0) {
    return { ok: false, message: 'Datos inválidos para crear el empleado.' };
  }

  try {
    await prisma.employee.create({
      data: { firstName, lastName, email, department, salary },
    });
  } catch {
    return { ok: false, message: 'No se pudo crear el empleado (posible email duplicado).' };
  }

  revalidatePath('/');
  return { ok: true };
}

export async function updateEmployee(
  id: number,
  _prevState: EmployeeActionState,
  formData: FormData,
): Promise<EmployeeActionState> {
  if (!Number.isInteger(id) || id <= 0) return { ok: false, message: 'ID inválido.' };

  const firstName = getString(formData, 'firstName');
  const lastName = getString(formData, 'lastName');
  const email = getString(formData, 'email').toLowerCase();
  const department = getString(formData, 'department');
  const salary = getNumber(formData, 'salary');

  if (!firstName || !lastName || !email || !department || salary === null || salary < 0) {
    return { ok: false, message: 'Datos inválidos para actualizar el empleado.' };
  }

  try {
    await prisma.employee.update({
      where: { id },
      data: { firstName, lastName, email, department, salary },
    });
  } catch {
    return { ok: false, message: 'No se pudo actualizar el empleado (posible email duplicado).' };
  }

  revalidatePath('/');
  return { ok: true };
}

export async function deleteEmployee(id: number) {
  if (!Number.isInteger(id) || id <= 0) throw new Error('ID inválido.');

  await prisma.employee.delete({ where: { id } });
  revalidatePath('/');
}
