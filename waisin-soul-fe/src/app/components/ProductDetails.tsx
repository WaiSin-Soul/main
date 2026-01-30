"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product, ProductOption } from "@/app/data/products";

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (
    productId: string,
    material: ProductOption,
    size: ProductOption,
    style: ProductOption,
    quantity: number
  ) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onAddToCart,
}) => {
  const router = useRouter();
  const [selectedMaterial, setSelectedMaterial] = useState<ProductOption>(
    product.materials[0]
  );
  const [selectedSize, setSelectedSize] = useState<ProductOption>(
    product.sizes[0]
  );
  const [selectedStyle, setSelectedStyle] = useState<ProductOption>(
    product.styles[0]
  );
  const [quantity, setQuantity] = useState(1);

  const calculatePrice = () => {
    let price = product.basePrice;
    if (selectedSize.price) price += selectedSize.price;
    if (selectedStyle.price) price += selectedStyle.price;
    return price;
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, selectedMaterial, selectedSize, selectedStyle, quantity);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-8">
        {product.collection ? (
          <>
            <button 
              onClick={() => product.collection.includes('product') ? router.push("/products") :  router.push(`/art/${product.collection}`)}
              className="text-gray-400 hover:text-white transition-colors capitalize"
            >
              {product.collection.replace('-', ' ')}
            </button>
            <span className="mx-2">&gt;</span>
            <span className="text-white">{product.name}</span>
          </>
        ) : (
          <>
            <span>Collection</span> <span className="mx-2">&gt;</span> <span className="text-white">{product.name}</span>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Image & Share */}
        <div>
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-8">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Share Section */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">Share</p>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" strokeWidth="2" stroke="currentColor" fill="none"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Info & Options */}
        <div>
          {/* Product Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4 uppercase tracking-wide">
              {product.name}
            </h1>
            <p className="text-xl text-accent font-semibold mb-6">${calculatePrice().toFixed(2)}</p>
            <p className="text-gray-300 mb-4">{product.description}</p>
            <p className="text-gray-400 text-sm mb-8">{product.details}</p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4 items-center mb-12">
            <div className="flex items-center border border-gray-600">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-white hover:bg-gray-700 text-lg"
              >
                -
              </button>
              <span className="px-6 text-white min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-white hover:bg-gray-700 text-lg"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black hover:bg-gray-900 text-white font-bold py-3 px-6 transition-colors"
            >
              ADD TO CART
            </button>
            {/* <button className="bg-header hover:bg-header/90 text-white font-bold py-3 px-6 transition-colors">
              INSTANT CHECKOUT ⚡
            </button> */}
          </div>

          {/* Product Options */}
          <div className="space-y-8 border-t border-gray-700 pt-8">
            {/* Material Selection */}
            <div>
              <h3 className="text-sm font-semibold text-accent mb-2">1 Medium</h3>
              <h4 className="text-lg font-semibold text-white mb-4">{selectedMaterial.name}</h4>
              <div className="grid grid-cols-3 gap-4">
                {product.materials.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => setSelectedMaterial(material)}
                    className={`flex flex-col items-center gap-2 p-4 rounded border-2 transition-all ${
                      selectedMaterial.id === material.id
                        ? "border-accent bg-accent/10"
                        : "border-gray-600 hover:border-accent"
                    }`}
                  >
                    <div className="w-16 h-16 bg-gray-400 rounded flex items-center justify-center">
                      <span className="text-xs text-center font-semibold text-gray-700 px-1">{material.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-semibold text-accent mb-2">2 Size</h3>
              <select
                value={selectedSize.id}
                onChange={(e) => {
                  const size = product.sizes.find((s) => s.id === e.target.value);
                  if (size) setSelectedSize(size);
                }}
                className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded hover:border-accent transition-colors"
              >
                {product.sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.name} {size.price ? `(+$${size.price.toFixed(2)})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Style Selection */}
            <div>
              <h3 className="text-sm font-semibold text-accent mb-2">3 Styles</h3>
              <select
                value={selectedStyle.id}
                onChange={(e) => {
                  const style = product.styles.find((s) => s.id === e.target.value);
                  if (style) setSelectedStyle(style);
                }}
                className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded hover:border-accent transition-colors"
              >
                {product.styles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name} {style.price ? `(+$${style.price.toFixed(2)})` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
