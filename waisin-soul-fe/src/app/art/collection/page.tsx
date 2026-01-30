"use client";
import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import Image from "next/image";
// import ProductModal from "../../components/ProductModal";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  url: string;
  details: string;
}

const collectionData: Product[] = [
  {
    id: 1,
    name: "Best Sellers",
    description: "Description for collection 1",
    image: "/images/feature1.webp",
    url: "/art/best-sellers",
    details:
      "Premium collection piece showcasing exceptional artistry and craftsmanship.",
  },
  {
    id: 2,
    name: "Flora & Fauna",
    description: "Description for collection 2",
    image: "/images/feature2.webp",
    url: "/art/flora-fauna",
    details:
      "Exclusive collection featuring unique and limited edition artwork.",
  },
  {
    id: 3,
    name: "Landscapes",
    description: "Description for collection 3",
    image: "/images/feature3.webp",
    url: "/art/landscapes",
    details:
      "Curated collection representing the finest works of contemporary art.",
  },
  {
    id: 4,
    name: "Calligraphy & Contemporary",
    description: "Description for collection 4",
    image: "/images/feature3.webp",
    url: "/art/calligraphy-contemporary",
    details:
      "Curated collection representing the finest works of contemporary art.",
  },
  {
    id: 5,
    name: "Women Series",
    description: "Description for collection 5",
    image: "/images/feature3.webp",
    url: "/art/women-series",
    details:
      "Curated collection representing the finest works of contemporary art.",
  },
];

const Collection = () => {
  const [filteredCollection, setFilteredCollection] =
    useState<Product[]>(collectionData);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = collectionData.filter(
      (collection) =>
        collection.name.toLowerCase().includes(lowercasedQuery) ||
        collection.description.toLowerCase().includes(lowercasedQuery),
    );
    setFilteredCollection(filtered);
  };

  //   const handleViewDetails = (product: Product) => {
  //     setSelectedProduct(product);
  //     setIsModalOpen(true);
  //   };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Collection
        </h1>
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCollection.map((artwork) => (
          // <div key={artwork.id} className="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          //     <div className="relative h-48 w-full">
          //         <Image
          //             src={artwork.image}
          //             alt={artwork.name}
          //             fill
          //             className="object-cover"
          //         />
          //     </div>
          //     <div className="p-6">
          //         <div className="flex justify-between items-start mb-2">
          //             <h2 className="text-xl font-semibold text-white">{artwork.name}</h2>
          //             <span className="text-blue-500 font-bold">{artwork.price}</span>
          //         </div>
          //         <p className="text-gray-300 mb-4">{artwork.description}</p>
          //         <button
          //             onClick={() => handleViewDetails(artwork)}
          //             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          //         >
          //             View Details
          //         </button>
          //     </div>
          // </div>
          <Link
            href={artwork.url}
            key={artwork.id}
            className="group flex flex-col items-center text-accent"
          >
            <div className="relative w-full aspect-square border border-accent/60 bg-neutral-200 overflow-hidden">
              <Image
                src={artwork.image}
                alt={artwork.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 flex items-center w-full gap-4">
              <span className="h-px flex-1 bg-accent/60" />
              <span className="text-lg font-kalam text-accent tracking-wide">
                {artwork.name}
              </span>
              <span className="h-px flex-1 bg-accent/60" />
            </div>
          </Link>
        ))}
      </div>
      {filteredCollection.length === 0 && (
        <div className="text-center text-gray-300 mt-8">
          No artworks found matching your search.
        </div>
      )}

      {/* <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      /> */}
    </div>
  );
};

export default Collection;
