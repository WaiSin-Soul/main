import { createClient } from "../../lib/supabase-server";

type OrderItem = {
  id: string;
  quantity: number;
  price_at_purchase: number;
  products: {
    name: string;
    image_url: string | null;
  } | null;
} & Record<string, any>;

type Order = {
  id: string;
  created_at: string;
  email: string;
  status: string;
  total_price: number;
  order_items: OrderItem[];
};

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const { data: ordersData, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      created_at,
      email,
      status,
      total_price,
      order_items (
        id,
        quantity,
        price_at_purchase,
        products (
          name,
          image_url
        )
      )
    `,
    )
    .order("created_at", { ascending: false });

  const orders = ordersData as Order[] | null;

  if (error) {
    console.error(error);
    return <div className="p-6">Failed to load orders.</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>

      {orders?.length === 0 && <p className="text-gray-500">No orders yet.</p>}

      {orders?.map((order: Order) => (
        <div
          key={order.id}
          className="border rounded-xl p-6 bg-white shadow-sm space-y-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{order.email}</p>
              <p className="text-sm text-gray-500">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">${order.total_price.toFixed(2)}</p>
              <p className="text-sm capitalize text-gray-600">{order.status}</p>
            </div>
          </div>

          <div className="space-y-2">
            {order.order_items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.products?.name} × {item.quantity}
                </span>

                <span>
                  ${(item.price_at_purchase * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
