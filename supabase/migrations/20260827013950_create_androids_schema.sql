-- DOMÉSTIKA · esquema inicial (Fase 4)
-- Tabla principal `androids` (spec sección 7.1) + tablas auxiliares
-- `android_capabilities` y `android_gallery` (spec sección 7.2).
-- Las especificaciones técnicas (7.2 "android_specs") se guardan como
-- jsonb en `androids.specs` en vez de tabla propia: la spec pide
-- "evitar normalizar de más antes de tener una necesidad real" y son
-- pares clave/valor de solo lectura para la ficha.

create extension if not exists pgcrypto;

create type android_category as enum (
  'cuidados',
  'limpieza',
  'jardineria',
  'seguridad',
  'compania',
  'entretenimiento',
  'asistencia'
);

create table androids (
  id uuid primary key default gen_random_uuid(),

  code text not null unique,
  name text not null,
  model text not null,
  slug text not null unique,
  category android_category not null,
  function_title text not null,
  short_description text not null,
  long_description text not null,
  personality text not null,
  quote text,

  purchase_price numeric(12, 2) not null,
  leasing_monthly numeric(12, 2),
  currency text not null default 'USD',
  purchase_available boolean not null default true,
  leasing_available boolean not null default false,
  stock integer not null default 0,

  height_m numeric(4, 2),
  weight_kg numeric(6, 2),
  autonomy_hours integer,
  max_assistance_kg numeric(6, 2),
  voice_recognition text,
  social_interaction text,
  connectivity text,
  sanitary_limit text,
  requires_specialized_install boolean not null default false,

  main_image_url text,
  specs jsonb not null default '[]'::jsonb,

  featured boolean not null default false,
  active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint androids_purchase_price_check check (purchase_price >= 0),
  constraint androids_leasing_monthly_check check (leasing_monthly is null or leasing_monthly >= 0),
  constraint androids_stock_check check (stock >= 0)
);

create index androids_category_idx on androids (category);
create index androids_active_featured_idx on androids (active, featured);

create table android_capabilities (
  id uuid primary key default gen_random_uuid(),
  android_id uuid not null references androids (id) on delete cascade,
  title text not null,
  description text not null,
  sort_order integer not null default 0
);

create index android_capabilities_android_id_idx on android_capabilities (android_id);

create table android_gallery (
  id uuid primary key default gen_random_uuid(),
  android_id uuid not null references androids (id) on delete cascade,
  url text not null,
  alt text not null default '',
  sort_order integer not null default 0
);

create index android_gallery_android_id_idx on android_gallery (android_id);

-- updated_at automático
create function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger androids_set_updated_at
  before update on androids
  for each row
  execute function set_updated_at();

-- RLS: lectura pública de androides activos y sus datos asociados.
-- Sin políticas de escritura para anon/authenticated: hasta que se
-- proteja /admin con Supabase Auth (spec sección 13), las escrituras
-- se hacen con la service role key desde el servidor.
alter table androids enable row level security;
alter table android_capabilities enable row level security;
alter table android_gallery enable row level security;

create policy "Androides activos son públicos"
  on androids for select
  using (active = true);

create policy "Capacidades de androides activos son públicas"
  on android_capabilities for select
  using (
    exists (
      select 1 from androids a
      where a.id = android_capabilities.android_id
        and a.active = true
    )
  );

create policy "Galería de androides activos es pública"
  on android_gallery for select
  using (
    exists (
      select 1 from androids a
      where a.id = android_gallery.android_id
        and a.active = true
    )
  );
