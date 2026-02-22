"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface SearchResult {
  id: string;
  name: string;
  description?: string;
  image?: string;
  collection?: string;
  basePrice?: number;
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  isModalOpen?: boolean;
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isModalOpen = false,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const initialPathnameRef = useRef<string>(pathname);

  // Close modal when pathname changes (not on initial mount)
  useEffect(() => {
    if (isModalOpen && pathname !== initialPathnameRef.current) {
      onClose?.();
    }
  }, [pathname, isModalOpen, onClose]);

  // Search as user types
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        try {
          const url = `/api/search?q=${encodeURIComponent(query)}`;
          const response = await fetch(url);
          const data = await response.json();
          setResults(data.results || []);
          setShowResults(true);
        } catch (error) {
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
      onSearch?.(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        if (isModalOpen) {
          onClose?.();
        } else {
          setShowResults(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleResultClick = (collection: string, id: string) => {
    // Determine the correct URL path based on collection
    const collections: Record<string, string> = {
      featured: "/art/featured",
      landscapes: "/art/landscapes",
      "flora-fauna": "/art/flora-fauna",
      "women-series": "/art/women-series",
      "calligraphy-contemporary": "/art/calligraphy-contemporary",
      products: "/products",
    };
    const basePath = collections[collection] || "/art/featured";
    // const url = `${basePath}/${id}`;
    const url = `${basePath}`;

    setQuery("");
    setShowResults(false);
    setResults([]);
    onClose?.();
    router.push(url);
  };

  // Modal version
  if (isModalOpen) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-start justify-center pt-20"
        onClick={onClose}
      >
        <div
          ref={searchRef}
          className="w-full max-w-2xl mx-4 bg-[#2a2a2a] border border-gray-700 rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSearch} className="p-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search art & products..."
                value={query}
                onChange={handleInputChange}
                autoFocus
                className="w-full p-4 bg-[#1a1a1a] border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-4 rounded-r-md hover:bg-blue-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* Search Results */}
          {query.length >= 2 && (
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-6 text-center text-gray-400">
                  <div className="inline-block animate-spin">⏳</div> Searching...
                </div>
              ) : results.length > 0 ? (
                <div className="divide-y divide-gray-700">
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() =>
                        handleResultClick(result.collection || "featured", result.id)
                      }
                      className="w-full flex items-start gap-3 p-4 hover:bg-[#3a3a3a] transition-colors text-left"
                    >
                      {result.image && (
                        <div className="w-16 h-16 flex-shrink-0 relative">
                          <Image
                            src={result.image}
                            alt={result.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">
                          {result.name}
                        </h3>
                        {result.description && (
                          <p className="text-sm text-gray-400 truncate">
                            {result.description}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 capitalize mt-1">
                          {result.collection?.replace("-", " ")}
                        </p>
                      </div>
                      {result.basePrice && (
                        <div className="text-right flex-shrink-0">
                          <p className="text-blue-400 font-semibold">
                            ${result.basePrice}
                          </p>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-400">
                  No results found for "{query}"
                </div>
              )}
            </div>
          )}

          {query.length < 2 && (
            <div className="p-6 text-center text-gray-400">
              Start typing to search for art and products...
            </div>
          )}
        </div>
      </div>
    );
  }

  // Inline version (for individual pages)
  return (
    <div ref={searchRef} className="w-full relative">
      <form onSubmit={handleSearch} className="w-full">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search art & products..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.length >= 2 && setShowResults(true)}
            className="w-full p-3 bg-[#1a1a1a] border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-r-md hover:bg-blue-700 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (results.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#2a2a2a] border border-gray-700 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">
              <div className="inline-block animate-spin">⏳</div> Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-gray-700">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() =>
                    handleResultClick(result.collection || "featured", result.id)
                  }
                  className="w-full flex items-start gap-3 p-3 hover:bg-[#3a3a3a] transition-colors text-left"
                >
                  {result.image && (
                    <div className="w-12 h-12 flex-shrink-0 relative">
                      <Image
                        src={result.image}
                        alt={result.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">
                      {result.name}
                    </h3>
                    {result.description && (
                      <p className="text-sm text-gray-400 truncate">
                        {result.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 capitalize">
                      {result.collection?.replace("-", " ")}
                    </p>
                  </div>
                  {result.basePrice && (
                    <div className="text-right flex-shrink-0">
                      <p className="text-blue-400 font-semibold">
                        ${result.basePrice}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-400">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;