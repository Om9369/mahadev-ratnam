import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  const { slug } = params;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 404 });
  }

  return Response.json(data);
}