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
  total_amount: number;
  order_items: OrderItem[];
};

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const { data: ordersData, error } = await supabase
    .from("orders")
    .select(`*`)
    .order("created_at", { ascending: false });

  const orders = ordersData as Order[] | null;

  if (error) {
    return <div className="p-6">Failed to load orders.</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>

      {orders?.length === 0 && <p className="text-gray-500">No orders yet.</p>}

      {orders?.map((order: Order) => (
        <div
          key={order.id}
          className="border rounded-xl p-6 bg-[#1a1a1a] shadow-sm space-y-4"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <p className="font-semibold">{order.email}</p>
              <p className="text-sm text-gray-500">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">${order.total_amount.toFixed(2)}</p>
              <p className="text-sm capitalize text-gray-600">{order.status}</p>
            </div>
          </div>

          <div className="space-y-2">
            {(order.order_items ?? []).map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.products?.name} × {item.quantity}
                </span>
                <span>
                  $
                  {(
                    (item.price_at_purchase ??
                      item.unit_price ??
                      item.price ??
                      0) * item.quantity
                  ).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
