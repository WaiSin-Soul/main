"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

interface Product {
    id: number | string;
    name: string;
    description: string;
    price: string | number;
    image: string;
    details?: string;
}

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();

    if (!isOpen || !product) return null;

    const numericPrice = typeof product.price === 'string' 
        ? parseFloat(product.price.replace('$', '')) 
        : product.price;

    const handleAddToCart = () => {
        addItem({
            id: product.id.toString(),
            name: product.name,
            price: numericPrice,
            quantity: quantity,
            image: product.image
        });
        setQuantity(1);
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-[#1a1a1a] rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-700 bg-[#1a1a1a]">
                        <h2 className="text-2xl font-bold text-white">{product.name}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Product Image */}
                            <div className="relative h-80 w-full">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover rounded-lg"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <div className="mb-4">
                                        <span className="text-3xl font-bold text-blue-500">
                                            {typeof product.price === 'string' ? product.price : `$${product.price.toFixed(2)}`}
                                        </span>
                                    </div>

                                    <p className="text-gray-300 mb-6 text-lg">{product.description}</p>

                                    {product.details && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-white mb-2">Details</h3>
                                            <p className="text-gray-400">{product.details}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Quantity and Add to Cart */}
                                <div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Quantity
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-600"
                                            >
                                                -
                                            </button>
                                            <span className="text-white text-lg font-semibold w-8 text-center">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductModal;
