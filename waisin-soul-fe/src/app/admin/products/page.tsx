import { createClient } from "../../lib/supabase-server";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  alt_tag: string | null;
  stock: number;
  created_at: string;
};

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-6">Failed to load products.</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Products</h1>

        <a
          href="/admin/products/new"
          className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-80"
        >
          Add Product
        </a>
      </div>

      {products?.length === 0 && (
        <p className="text-gray-500">No products created yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product: Product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 bg-white shadow-sm space-y-3"
          >
            {product.image_url && (
              <div className="relative w-full h-48">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}

            <div>
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold">${product.price.toFixed(2)}</span>

              <span className="text-sm text-gray-600">
                Stock: {product.stock}
              </span>
            </div>

            <div className="flex justify-between text-sm pt-2">
              <a
                href={`/admin/products/${product.id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </a>

              <a
                href={`/admin/products/${product.id}/delete`}
                className="text-red-600 hover:underline"
              >
                Delete
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
