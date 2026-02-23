"use client"
import React, { useEffect, useState, useRef, Suspense } from 'react';
import SearchBar from '../../components/SearchBar';
import ArtworkModal from '../../components/ArtworkModal';
import ResponsiveArtImage from '../../components/ResponsiveArtImage';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Artwork = {
    id: string;
    name: string;
    description: string | null;
    price?: number;
    image_url: string | null;
    collection: string;
    basePrice?: number;
};

const womenSeriesSubcategories = [
    {
        id: 1,
        name: 'Women of Inspiration',
        image: '/images/SeekingKnowledge_hopkfc.jpg',
        url: '/art/women-series?category=inspiration',
    },
    {
        id: 2,
        name: 'Women of Passion',
        image: '/images/Meditation_afxwma.jpg',
        url: '/art/women-series?category=passion',
    },
    {
        id: 3,
        name: 'Women of Seasons',
        image: '/images/Spring_zxi2gw.jpg',
        url: '/art/women-series?category=seasons',
    },
    {
        id: 4,
        name: 'Women of Tao Series',
        image: '/images/Touched_by_the_music_of_arping_color_corrected_copy_taznrs.jpg',
        url: '/art/women-series?category=tao',
    },
];

function WomenSeriesContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
    const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [highlightedId, setHighlightedId] = useState<string | null>(null);
    const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const getCategoryTitle = () => {
        const categoryMap: Record<string, string> = {
            inspiration: "Women of Inspiration Series",
            passion: "Women of Passion",
            seasons: "Women of Seasons",
            tao: "Women of Tao Series",
        };
        return category && categoryMap[category] ? categoryMap[category] : "Women Series";
    };

    useEffect(() => {
        if (!category) {
            setAllArtworks([]);
            setFilteredArtworks([]);
            setLoading(false);
            setError(null);
            return;
        }

        const fetchArtworks = async () => {
            try {
                let url = '/api/admin/products?collection=women-series';
                if (category) {
                    url += `&subcategory=${category}`;
                }
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to load artworks');
                }
                const data: Artwork[] = await response.json();
                setAllArtworks(data);
                setFilteredArtworks(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load artworks');
            } finally {
                setLoading(false);
            }
        };
        fetchArtworks();
    }, [category]);

    // Handle highlighting from search
    useEffect(() => {
        const highlight = searchParams.get('highlight');
        if (highlight && !loading) {
            setHighlightedId(highlight);
            setTimeout(() => {
                const element = itemRefs.current[highlight];
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
            setTimeout(() => {
                setHighlightedId(null);
            }, 3000);
        }
    }, [searchParams, loading]);

    const handleSearch = (query: string) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = allArtworks.filter(artwork =>
            artwork.name.toLowerCase().includes(lowercasedQuery) ||
            (artwork.description ?? '').toLowerCase().includes(lowercasedQuery)
        );
        setFilteredArtworks(filtered);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 text-center text-white">
                Loading artworks...
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12 text-center text-red-400">
                {error}
            </div>
        );
    }

    if (!category) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">Women Series</h1>
                </div>
                <div className="columns-1 md:columns-2 lg:columns-4 gap-8">
                    {womenSeriesSubcategories.map((subcategory) => (
                        <Link
                            href={subcategory.url}
                            key={subcategory.id}
                            className="group mb-8 break-inside-avoid flex flex-col items-center text-accent"
                        >
                            <ResponsiveArtImage
                                src={subcategory.image}
                                alt={subcategory.name}
                                className="border border-accent/60 bg-neutral-200"
                                imageClassName="object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="mt-4 flex items-center w-full gap-4">
                                <span className="h-px flex-1 bg-accent/60" />
                                <span className="text-lg font-kalam text-accent tracking-wide text-center">
                                    {subcategory.name}
                                </span>
                                <span className="h-px flex-1 bg-accent/60" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">{getCategoryTitle()}</h1>
                <div className="mb-12">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                {filteredArtworks.map(artwork => (
                    <div
                        key={artwork.id}
                        ref={(el) => { itemRefs.current[artwork.id] = el; }}
                        className={`mb-6 break-inside-avoid transition-all duration-1000 ${
                            highlightedId === artwork.id
                                ? 'animate-glow ring-4 ring-blue-500 ring-opacity-75'
                                : ''
                        }`}
                    >
                        {/* <Link
                            href={`/art/women-series/${artwork.id}`}
                            className="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 block"
                        > */}
                        <div
                            onClick={() => setSelectedArtwork(artwork)}
                            className="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    >
                        <ResponsiveArtImage
                            src={artwork.image_url || '/images/feature1.webp'}
                            alt={artwork.name}
                            className="bg-neutral-200"
                            imageClassName="object-contain hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-semibold text-white">{artwork.name}</h2>
                                {/* <span className="text-blue-500 font-bold">${(artwork.price || artwork.basePrice || 0).toFixed(2)}</span> */}
                            </div>
                            {/* <p className="text-gray-300 mb-4">{artwork.description}</p> */}
                                {/* <div className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-center">
                                    View Details
                                </div> */}
                            </div>
                        </div>
                        {/* </Link> */}
                    </div>
                ))}
            </div>
            {filteredArtworks.length === 0 && (
                <div className="text-center text-gray-300 mt-8">
                    No artworks found matching your search.
                </div>
            )}

            <ArtworkModal 
                artwork={selectedArtwork} 
                onClose={() => setSelectedArtwork(null)} 
            />
        </div>
    );
}

export default function Women_Series() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-12">
                <div className="text-center text-white">Loading...</div>
            </div>
        }>
            <WomenSeriesContent />
        </Suspense>
    );
}