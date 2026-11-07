import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/admin";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireAdmin();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ products: data });
  } catch {
    return NextResponse.json(
      { error: "Unauthorized or server error" },
      { status: 401 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("products")
      .insert({
        name: body.name,
        description: body.description ?? "",
        price: Number(body.price),
        category: body.category,
        image_url: body.image_url ?? "",
        stock: Number(body.stock ?? 0),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ product: data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Could not add product" },
      { status: 400 }
    );
  }
}
