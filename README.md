# DOMÉSTIKA

Tienda ficticia de androides domésticos — proyecto de portfolio Full-Stack.
Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + Framer Motion +
Zustand + Supabase.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

La Home y el catálogo temporal usan datos locales en
`src/data/seed/androids.ts` (los 14 androides Súper Sónicos). Esto se
reemplaza por datos en vivo de Supabase en la Fase 5.

## Supabase

El esquema vive en `supabase/migrations/` y el seed en `supabase/seed.sql`
(generado desde `src/data/seed/androids.ts` — no editar a mano, correr
`npx tsx scripts/generate-seed-sql.ts` después de cambiar el seed local).

### Paso manual (una vez): crear el proyecto

Este entorno no tiene acceso a tu cuenta de Supabase, así que este paso lo
hacés vos:

1. Creá un proyecto en [supabase.com](https://supabase.com/dashboard).
2. En el SQL Editor del proyecto, corré en orden:
   - `supabase/migrations/20260827013950_create_androids_schema.sql`
   - `supabase/seed.sql`
3. Copiá `.env.local.example` a `.env.local` y completá `NEXT_PUBLIC_SUPABASE_URL`
   y `NEXT_PUBLIC_SUPABASE_ANON_KEY` desde Settings → API del proyecto.

### CLI (opcional, para seguir versionando el esquema)

```bash
npx supabase login          # abre el navegador, requiere tu cuenta
npx supabase link --project-ref <ref-de-tu-proyecto>
npx supabase db push        # aplica las migraciones pendientes
npx supabase gen types typescript --linked > src/lib/supabase/database.types.ts
```

El esquema fue validado localmente contra Postgres 16 (tablas, índices,
triggers, políticas RLS y el seed de los 14 androides) antes de commitear,
pero no contra un proyecto Supabase real: revisá que corra limpio en el
SQL Editor la primera vez.

### Modelo de datos

- `androids`: tabla principal (spec sección 7.1). `specs` es `jsonb` con
  pares clave/valor para la ficha técnica.
- `android_capabilities`, `android_gallery`: tablas auxiliares (spec 7.2).
- RLS habilitado en las tres tablas: lectura pública solo de androides
  `active = true`; sin políticas de escritura para `anon`/`authenticated`
  (las escrituras del admin usan la service role key hasta que se agregue
  autenticación, spec sección 13).

## Admin (`/admin`)

Alta, edición, activación y baja de androides (spec sección 12). Corre en
**modo solo lectura** (formularios deshabilitados, banner visible) hasta
que además de `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`
completes en `.env.local`:

```
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

Es la key de Settings → API → service_role. Las escrituras del admin la
necesitan porque las políticas RLS solo permiten lectura pública — nunca
se expone al cliente, solo la usan las Server Actions en
`src/app/admin/actions.ts`.

**Sin autenticación todavía** (permitido en desarrollo por la spec, sección
13). Antes de desplegar este proyecto en un lugar público, `/admin` debe
protegerse con Supabase Auth o un gate equivalente — hoy cualquiera con la
URL puede editar o borrar androides si el proyecto está conectado.
