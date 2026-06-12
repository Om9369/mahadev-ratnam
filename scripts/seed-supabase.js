const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load .env.local for credentials
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder-project")) {
  console.error("Error: Please set valid NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runSeed() {
  console.log("Starting Supabase seeding...");

  const allProductsPath = path.resolve(__dirname, "../src/data/allProducts.js");
  if (!fs.existsSync(allProductsPath)) {
    console.error(`Error: File not found at ${allProductsPath}`);
    process.exit(1);
  }

  // Read the ES module file and convert to CommonJS format temporarily
  const fileContent = fs.readFileSync(allProductsPath, "utf-8");
  const commonJsContent = fileContent.replace(
    /export\s+const\s+allProducts\s*=/,
    "module.exports ="
  );

  const tempPath = path.resolve(__dirname, "./temp-products.js");
  fs.writeFileSync(tempPath, commonJsContent, "utf-8");

  // Require the temporary file
  let allProducts;
  try {
    allProducts = require(tempPath);
  } catch (error) {
    console.error("Failed to require products:", error);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    process.exit(1);
  }

  // Clean up temporary file
  fs.unlinkSync(tempPath);

  console.log(`Found ${allProducts.length} products to seed.`);

  // Format products for Supabase
  const formattedProducts = allProducts.map((p) => ({
    name: p.name,
    slug: p.slug,
    category: p.category,
    sub_category: p.subCategory || "",
    image: p.image,
    purity: Array.isArray(p.purity) ? p.purity : [],
    weight: p.weight || null,
    price_18k: p.price18k ? parseInt(p.price18k, 10) : null,
    price_22k: p.price22k ? parseInt(p.price22k, 10) : null,
    availability: p.availability || "Available",
    description: p.description || null,
    featured: !!p.featured,
  }));

  // Batch insert into Supabase
  const { data, error } = await supabase
    .from("products")
    .insert(formattedProducts)
    .select();

  if (error) {
    console.error("Error seeding products to Supabase:", error);
    process.exit(1);
  }

  console.log(`Successfully seeded ${data.length} products to Supabase!`);
}

runSeed().catch((err) => {
  console.error("Unhandled error during seeding:", err);
  process.exit(1);
});
