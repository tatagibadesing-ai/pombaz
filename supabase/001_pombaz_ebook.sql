-- POMBAZ Receita Magica - ebook/admin schema
-- Run this in Supabase SQL Editor after enabling Auth.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.ebook_categories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ebook_recipes (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.ebook_categories(id) on delete cascade,
  title text not null,
  subtitle text,
  image_url text,
  ingredients jsonb not null default '[]'::jsonb,
  preparation_steps jsonb not null default '[]'::jsonb,
  nutrition jsonb not null default '{}'::jsonb,
  notes text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ebook_recipes_ingredients_array check (jsonb_typeof(ingredients) = 'array'),
  constraint ebook_recipes_preparation_array check (jsonb_typeof(preparation_steps) = 'array'),
  constraint ebook_recipes_nutrition_object check (jsonb_typeof(nutrition) = 'object')
);

create table if not exists public.ebook_access (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  has_access boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ebook_categories_order_idx on public.ebook_categories(sort_order, created_at);
create index if not exists ebook_recipes_category_order_idx on public.ebook_recipes(category_id, sort_order, created_at);
create index if not exists ebook_access_email_idx on public.ebook_access(lower(email));

drop trigger if exists set_ebook_categories_updated_at on public.ebook_categories;
create trigger set_ebook_categories_updated_at
before update on public.ebook_categories
for each row execute function public.set_updated_at();

drop trigger if exists set_ebook_recipes_updated_at on public.ebook_recipes;
create trigger set_ebook_recipes_updated_at
before update on public.ebook_recipes
for each row execute function public.set_updated_at();

drop trigger if exists set_ebook_access_updated_at on public.ebook_access;
create trigger set_ebook_access_updated_at
before update on public.ebook_access
for each row execute function public.set_updated_at();

alter table public.ebook_categories enable row level security;
alter table public.ebook_recipes enable row level security;
alter table public.ebook_access enable row level security;

create or replace function public.is_pombaz_admin()
returns boolean
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = '2closett@gmail.com';
$$;

create or replace function public.has_ebook_access()
returns boolean
language sql
stable
as $$
  select public.is_pombaz_admin()
    or exists (
      select 1
      from public.ebook_access access
      where lower(access.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
        and access.has_access = true
    );
$$;

drop policy if exists "ebook categories read with access" on public.ebook_categories;
create policy "ebook categories read with access"
on public.ebook_categories
for select
to authenticated
using (public.has_ebook_access() and (is_published = true or public.is_pombaz_admin()));

drop policy if exists "ebook recipes read with access" on public.ebook_recipes;
create policy "ebook recipes read with access"
on public.ebook_recipes
for select
to authenticated
using (public.has_ebook_access() and (is_published = true or public.is_pombaz_admin()));

drop policy if exists "ebook categories admin write" on public.ebook_categories;
create policy "ebook categories admin write"
on public.ebook_categories
for all
to authenticated
using (public.is_pombaz_admin())
with check (public.is_pombaz_admin());

drop policy if exists "ebook recipes admin write" on public.ebook_recipes;
create policy "ebook recipes admin write"
on public.ebook_recipes
for all
to authenticated
using (public.is_pombaz_admin())
with check (public.is_pombaz_admin());

drop policy if exists "ebook access users read own" on public.ebook_access;
create policy "ebook access users read own"
on public.ebook_access
for select
to authenticated
using (
  public.is_pombaz_admin()
  or lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
);

drop policy if exists "ebook access admin write" on public.ebook_access;
create policy "ebook access admin write"
on public.ebook_access
for all
to authenticated
using (public.is_pombaz_admin())
with check (public.is_pombaz_admin());

insert into public.ebook_categories (title, slug, description, sort_order)
values
  ('Cafe da Manha', 'cafe-da-manha', 'Receitas praticas para comecar o dia com comida de verdade.', 10),
  ('Almoco', 'almoco', 'Pratos simples, completos e faceis de repetir na rotina.', 20),
  ('Jantar', 'jantar', 'Opcoes leves e saborosas para fechar o dia sem sofrimento.', 30)
on conflict (slug) do nothing;

insert into public.ebook_access (email, has_access, notes)
values ('2closett@gmail.com', true, 'Admin POMBAZ')
on conflict (email) do update set has_access = excluded.has_access;
