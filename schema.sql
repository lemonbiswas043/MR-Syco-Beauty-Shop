create extension if not exists pgcrypto;
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 category text not null,
 price numeric(10,2) not null check(price>=0),
 description text,
 image_url text,
 stock integer not null default 0 check(stock>=0),
 active boolean not null default true,
 created_at timestamptz not null default now()
);
create table if not exists public.orders (
 id uuid primary key default gen_random_uuid(),
 customer_name text not null,
 phone text not null,
 address text not null,
 total numeric(10,2) not null,
 status text not null default 'pending',
 created_at timestamptz not null default now()
);
create table if not exists public.order_items (
 id uuid primary key default gen_random_uuid(),
 order_id uuid not null references public.orders(id) on delete cascade,
 product_id uuid references public.products(id),
 product_name text not null,
 quantity integer not null check(quantity>0),
 unit_price numeric(10,2) not null
);
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
drop policy if exists "Public can view active products" on public.products;
create policy "Public can view active products" on public.products for select using (active=true);
-- Admin API uses the server-only service role key; never expose it in browser code.
insert into public.products(name,category,price,description,stock) values
('Hydrating Daily Cleanser','Skincare',650,'A gentle daily cleanser',20),
('Soft Matte Lip Color','Makeup',490,'A lightweight lip color',15),
('Nourish Hair Serum','Hair Care',780,'A simple hair-care essential',12)
on conflict do nothing;
