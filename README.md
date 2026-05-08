# Desarrollo Web Integral - Diagnóstico

Examen diagnóstico con **Next.js** para la materia de Desarrollo Web Integral.

## Nombre del proyecto

**Registro de empleados - Rocket Code**

## Descripción

Aplicación web de una sola vista para el **CRUD de empleados**. La interfaz está construida con **Tailwind CSS**. Los datos se persisten en **SQLite** mediante **Prisma ORM** y las operaciones de escritura se realizan con **Server Actions** del App Router de Next.js.

## Tecnologías utilizadas

| Área | Tecnología | Versión |
|------|------------|------------------------|
| Framework | [Next.js](https://nextjs.org) (App Router) | 16.2.6 |
| Lenguaje | [TypeScript](https://www.typescriptlang.org/) | ^5 |
| UI | [React](https://react.dev/) | 19.2.4 |
| Estilos | [Tailwind CSS](https://tailwindcss.com/) | ^4 |
| ORM / BD | [Prisma](https://www.prisma.io/) + SQLite (`better-sqlite3`, driver adapter) | Prisma ^7.8.0 |
| Calidad | ESLint (`eslint-config-next`) | - |

## Funcionalidades

- Listado de empleados ordenado por fecha de creación.
- Registro de empleados.
- Edición de empleado existente.
- Eliminación de empleado existente.

## Instrucciones para ejecutar el proyecto

Desde la raíz del repositorio, entra al proyecto e instala dependencias:

```bash
cd diagnostico_dwi_isael
npm install
```

Configura la URL de la base de datos (en un archivo `.env` en `diagnostico_dwi_isael/`):

```env
DATABASE_URL="file:./dev.db"
```

Sincroniza el esquema con SQLite y genera el cliente de Prisma:

```bash
npx prisma db push
npx prisma generate
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre en el navegador la URL que indique la terminal (por defecto [http://localhost:3000](http://localhost:3000)).

### Scripts disponibles (`package.json`)

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run start` | Servidor de producción (tras `build`) |
| `npm run lint` | Análisis con ESLint |

## Evidencias o capturas de pantalla

[Evidencia en Google Drive](https://drive.google.com/drive/folders/1P-IJCnkAWoGp_iJytChkDfl28Fu_Z5AY?usp=sharing)

## Uso de IA

Se utilizó asistencia de IA para apoyo con comandos e implementación, resolución de errores de configuración y revisión de código.
