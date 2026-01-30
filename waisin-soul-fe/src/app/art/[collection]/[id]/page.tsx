"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getArtPiece, ProductOption } from "@/app/data/products";
import ProductDetails from "@/app/components/ProductDetails";
import { useCart } from "@/app/context/CartContext";

const ArtProductPage = () => {
  const params = useParams();
  const artId = params.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    // Decode URL-encoded product ID
    const decodedId = decodeURIComponent(artId);
    const foundProduct = getArtPiece(decodedId);
    setProduct(foundProduct);
    setLoading(false);
  }, [artId]);

  const handleAddToCart = (
    productId: string,
    material: ProductOption,
    size: ProductOption,
    style: ProductOption,
    quantity: number
  ) => {
    if (!product) return;

    let price = product.basePrice;
    if (size.price) price += size.price;
    if (style.price) price += style.price;

    const cartItemName = `${product.name} (${material.name}, ${size.name}, ${style.name})`;

    addItem({
      id: `${productId}-${material.id}-${size.id}-${style.id}`,
      name: cartItemName,
      price: price,
      quantity: quantity,
      image: product.image,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-400">The artwork you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ProductDetails product={product} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ArtProductPage;
