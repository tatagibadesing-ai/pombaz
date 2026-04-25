-- POMBAZ multi-ebook / product plans migration
-- Run this after 001_pombaz_ebook.sql.

create table if not exists public.ebook_products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  accent_color text not null default '#f0c000',
  accent_rgb text not null default '240, 192, 0',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_ebook_products_updated_at on public.ebook_products;
create trigger set_ebook_products_updated_at
before update on public.ebook_products
for each row execute function public.set_updated_at();

alter table public.ebook_products enable row level security;

insert into public.ebook_products (title, slug, description, accent_color, accent_rgb, sort_order)
values
  ('30 Receitas para Ganhar Massa', 'receitas-massa', 'Receitas praticas para ganhar massa sem complicar a rotina.', '#f0c000', '240, 192, 0', 10),
  ('Receita Magica', 'receita-magica', 'Receitas para emagrecer de verdade, com leitura limpa e acesso rapido.', '#399cff', '57, 156, 255', 20)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  accent_color = excluded.accent_color,
  accent_rgb = excluded.accent_rgb,
  sort_order = excluded.sort_order,
  is_active = true;

alter table public.ebook_categories
add column if not exists product_id uuid references public.ebook_products(id) on delete cascade;

alter table public.ebook_access
add column if not exists product_id uuid references public.ebook_products(id) on delete cascade;

update public.ebook_categories
set product_id = (select id from public.ebook_products where slug = 'receitas-massa')
where product_id is null;

update public.ebook_access
set product_id = (select id from public.ebook_products where slug = 'receitas-massa')
where product_id is null;

alter table public.ebook_categories
alter column product_id set not null;

alter table public.ebook_access
alter column product_id set not null;

alter table public.ebook_access
drop constraint if exists ebook_access_email_key;

create unique index if not exists ebook_access_email_product_idx
on public.ebook_access (email, product_id);

create index if not exists ebook_categories_product_order_idx
on public.ebook_categories(product_id, sort_order, created_at);

create index if not exists ebook_access_product_email_idx
on public.ebook_access(product_id, lower(email));

drop policy if exists "ebook products read with access" on public.ebook_products;
create policy "ebook products read with access"
on public.ebook_products
for select
to authenticated
using (
  public.is_pombaz_admin()
  or exists (
    select 1
    from public.ebook_access access
    where access.product_id = ebook_products.id
      and lower(access.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      and access.has_access = true
  )
);

drop policy if exists "ebook products admin write" on public.ebook_products;
create policy "ebook products admin write"
on public.ebook_products
for all
to authenticated
using (public.is_pombaz_admin())
with check (public.is_pombaz_admin());

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

insert into public.ebook_access (email, product_id, has_access, notes)
select '2closett@gmail.com', id, true, 'Admin POMBAZ'
from public.ebook_products
on conflict (email, product_id)
do update set has_access = true, notes = 'Admin POMBAZ', updated_at = now();
