create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  price numeric(10,2) not null,
  description text,
  image_url text,
  stock integer not null default 0,
  active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text not null,
  total numeric(10,2) not null,
  status text not null default 'pending',
  created_at timestamptz default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  quantity integer not null,
  unit_price numeric(10,2) not null
);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "Public can view active products"
on public.products
for select
using (active = true);

insert into public.products
(name, category, price, description, stock)
values
('Hydrating Daily Cleanser', 'Skincare', 650, 'Daily cleanser', 20),
('Soft Matte Lip Color', 'Makeup', 490, 'Soft lip color', 15),
('Nourish Hair Serum', 'Hair Care', 780, 'Hair serum', 12);
