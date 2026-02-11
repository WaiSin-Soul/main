"use client"

import { useEffect, useState } from "react"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/admin/orders")
      .then(res => res.json())
      .then(setOrders)
  }, [])

  return (
    <div>
      <h1>Orders</h1>
      {orders.map(order => (
        <div key={order.id}>
          <p>ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total_amount}</p>
        </div>
      ))}
    </div>
  )
}
