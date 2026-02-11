"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase-browser"

export default function AdminProducts() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleUpload = async () => {
    if (!file) return

    const fileName = `${Date.now()}-${file.name}`

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file)

    if (error) {
      console.error(error)
      return
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`

    await fetch("/api/admin/products", {
      method: "POST",
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        image_url: imageUrl,
      }),
    })

    alert("Product created")
  }

  return (
    <div>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Create Product</button>
    </div>
  )
}
