export interface ProductOption {
  id: string;
  name: string;
  type: "material" | "size" | "style";
  value: string;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  images?: string[];
  details: string;
  materials: ProductOption[];
  sizes: ProductOption[];
  styles: ProductOption[];
  // collection: 'best-sellers' | 'landscapes' | 'flora-fauna' | 'women-series' | 'calligraphy-contemporary' | 'products';
  collection:
    | "featured"
    | "landscapes"
    | "flora-fauna"
    | "women-series"
    | "calligraphy-contemporary"
    | "products";
}

export const productsDatabase: Record<string, Product> = {
  "seeking-knowledge-laptop": {
    id: "seeking-knowledge-laptop",
    name: "SEEKING KNOWLEDGE Laptop Sleeve",
    description:
      "Premium laptop sleeve featuring the SEEKING KNOWLEDGE artwork",
    basePrice: 45,
    image: "/images/feature1.webp",
    collection: "products",
    details:
      "High-quality laptop protection with artistic design. Perfect for creative professionals.",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      {
        id: "mat-3",
        name: "Smooth Fine Art Paper III",
        type: "material",
        value: "smooth-iii",
      },
      {
        id: "mat-4",
        name: "Textured Fine Art Paper",
        type: "material",
        value: "textured",
      },
      {
        id: "mat-5",
        name: "High Gloss Metallic",
        type: "material",
        value: "gloss-metallic",
      },
    ],
    sizes: [
      { id: "size-1", name: "6 x 3", type: "size", value: "6x3" },
      { id: "size-2", name: "8 x 4", type: "size", value: "8x4", price: 10 },
      { id: "size-3", name: "12 x 6", type: "size", value: "12x6", price: 15 },
    ],
    styles: [
      {
        id: "style-1",
        name: "Just the Print - Borderless",
        type: "style",
        value: "borderless",
      },
      {
        id: "style-2",
        name: "Print with Frame",
        type: "style",
        value: "framed",
        price: 25,
      },
      {
        id: "style-3",
        name: "Canvas Wrap",
        type: "style",
        value: "canvas",
        price: 35,
      },
    ],
  },
  "serenity-laptop": {
    id: "serenity-laptop",
    name: "SERENITY Laptop Sleeve",
    description: "Calming SERENITY artwork on premium laptop sleeve",
    basePrice: 45,
    image: "/images/feature2.webp",
    collection: "products",
    details: "Durable laptop sleeve with serene artwork design.",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      {
        id: "mat-3",
        name: "Smooth Fine Art Paper III",
        type: "material",
        value: "smooth-iii",
      },
      {
        id: "mat-4",
        name: "Textured Fine Art Paper",
        type: "material",
        value: "textured",
      },
      {
        id: "mat-5",
        name: "High Gloss Metallic",
        type: "material",
        value: "gloss-metallic",
      },
    ],
    sizes: [
      { id: "size-1", name: "6 x 3", type: "size", value: "6x3" },
      { id: "size-2", name: "8 x 4", type: "size", value: "8x4", price: 10 },
      { id: "size-3", name: "12 x 6", type: "size", value: "12x6", price: 15 },
    ],
    styles: [
      {
        id: "style-1",
        name: "Just the Print - Borderless",
        type: "style",
        value: "borderless",
      },
      {
        id: "style-2",
        name: "Print with Frame",
        type: "style",
        value: "framed",
        price: 25,
      },
      {
        id: "style-3",
        name: "Canvas Wrap",
        type: "style",
        value: "canvas",
        price: 35,
      },
    ],
  },
  "ocean-spirit-laptop": {
    id: "ocean-spirit-laptop",
    name: "OCEAN SPIRIT Laptop Sleeve",
    description: "Vibrant OCEAN SPIRIT artwork on premium laptop sleeve",
    basePrice: 45,
    image: "/images/feature3.webp",
    collection: "products",
    details: "Eye-catching ocean-inspired laptop protection.",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      {
        id: "mat-3",
        name: "Smooth Fine Art Paper III",
        type: "material",
        value: "smooth-iii",
      },
      {
        id: "mat-4",
        name: "Textured Fine Art Paper",
        type: "material",
        value: "textured",
      },
      {
        id: "mat-5",
        name: "High Gloss Metallic",
        type: "material",
        value: "gloss-metallic",
      },
    ],
    sizes: [
      { id: "size-1", name: "6 x 3", type: "size", value: "6x3" },
      { id: "size-2", name: "8 x 4", type: "size", value: "8x4", price: 10 },
      { id: "size-3", name: "12 x 6", type: "size", value: "12x6", price: 15 },
    ],
    styles: [
      {
        id: "style-1",
        name: "Just the Print - Borderless",
        type: "style",
        value: "borderless",
      },
      {
        id: "style-2",
        name: "Print with Frame",
        type: "style",
        value: "framed",
        price: 25,
      },
      {
        id: "style-3",
        name: "Canvas Wrap",
        type: "style",
        value: "canvas",
        price: 35,
      },
    ],
  },
};

export const getProduct = (id: string): Product | undefined => {
  return productsDatabase[id];
};

export const getAllProducts = (): Product[] => {
  return Object.values(productsDatabase);
};

// Art pieces - these are individual artworks for the art collection pages
export const artPiecesDatabase: Record<string, Product> = {
  // 'best-seller-1': {
  //   id: 'best-seller-1',
  //   name: 'Best Seller 1',
  //   description: 'Description for best seller 1',
  "featured-1": {
    id: "featured-1",
    name: "Featured 1",
    description: "Description for featured 1",
    basePrice: 299.99,
    image: "/images/feature1.webp",
    details:
      "Premium quality artwork. High-resolution print on archival canvas. Perfect for any room.",
    // collection: 'best-sellers',
    collection: "featured",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      { id: "mat-3", name: "Canvas", type: "material", value: "canvas" },
    ],
    sizes: [
      { id: "size-1", name: "8 x 10", type: "size", value: "8x10" },
      {
        id: "size-2",
        name: "16 x 20",
        type: "size",
        value: "16x20",
        price: 50,
      },
      {
        id: "size-3",
        name: "24 x 36",
        type: "size",
        value: "24x36",
        price: 100,
      },
    ],
    styles: [
      { id: "style-1", name: "Print Only", type: "style", value: "print" },
      {
        id: "style-2",
        name: "Framed",
        type: "style",
        value: "framed",
        price: 75,
      },
    ],
  },
  // "best-seller-2": {
  //   id: "best-seller-2",
  //   name: "Best Seller 2",
  //   description: "Description for best seller 2",
    "featured-2": {
    id: "featured-2",
    name: "Featured 2",
    description: "Description for featured 2",
    basePrice: 349.99,
    image: "/images/feature2.webp",
    details:
      "Exquisite design with vibrant colors. Limited edition. Hand-finished details.",
    // collection: "best-sellers",
    collection: "featured",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      { id: "mat-3", name: "Canvas", type: "material", value: "canvas" },
    ],
    sizes: [
      { id: "size-1", name: "8 x 10", type: "size", value: "8x10" },
      {
        id: "size-2",
        name: "16 x 20",
        type: "size",
        value: "16x20",
        price: 50,
      },
      {
        id: "size-3",
        name: "24 x 36",
        type: "size",
        value: "24x36",
        price: 100,
      },
    ],
    styles: [
      { id: "style-1", name: "Print Only", type: "style", value: "print" },
      {
        id: "style-2",
        name: "Framed",
        type: "style",
        value: "framed",
        price: 75,
      },
    ],
  },
  // "best-seller-3": {
  //   id: "best-seller-3",
  //   name: "Best Seller 3",
  //   description: "Description for best seller 3",
  "featured-3": {
    id: "featured-3",
    name: "Featured 3",
    description: "Description for featured 3",
    basePrice: 399.99,
    image: "/images/feature3.webp",
    details: "Professional grade print. Sustainable materials. Frame included.",
    // collection: "best-sellers",
    collection: "featured",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      { id: "mat-3", name: "Canvas", type: "material", value: "canvas" },
    ],
    sizes: [
      { id: "size-1", name: "8 x 10", type: "size", value: "8x10" },
      {
        id: "size-2",
        name: "16 x 20",
        type: "size",
        value: "16x20",
        price: 50,
      },
      {
        id: "size-3",
        name: "24 x 36",
        type: "size",
        value: "24x36",
        price: 100,
      },
    ],
    styles: [
      { id: "style-1", name: "Print Only", type: "style", value: "print" },
      {
        id: "style-2",
        name: "Framed",
        type: "style",
        value: "framed",
        price: 75,
      },
    ],
  },
  "landscape-1": {
    id: "landscape-1",
    name: "Mountain Vista",
    description: "Beautiful landscape artwork with vibrant colors",
    basePrice: 249.99,
    image: "/images/feature1.webp",
    details:
      "Beautiful landscape artwork with vibrant colors. Perfect for nature lovers.",
    collection: "landscapes",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      { id: "mat-3", name: "Canvas", type: "material", value: "canvas" },
    ],
    sizes: [
      { id: "size-1", name: "8 x 10", type: "size", value: "8x10" },
      {
        id: "size-2",
        name: "16 x 20",
        type: "size",
        value: "16x20",
        price: 50,
      },
      {
        id: "size-3",
        name: "24 x 36",
        type: "size",
        value: "24x36",
        price: 100,
      },
    ],
    styles: [
      { id: "style-1", name: "Print Only", type: "style", value: "print" },
      {
        id: "style-2",
        name: "Framed",
        type: "style",
        value: "framed",
        price: 75,
      },
    ],
  },
  "landscape-2": {
    id: "landscape-2",
    name: "Serene Mountain",
    description: "Serene mountain scenery with exceptional detail",
    basePrice: 299.99,
    image: "/images/feature2.webp",
    details: "Serene mountain scenery with exceptional detail and depth.",
    collection: "landscapes",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      { id: "mat-3", name: "Canvas", type: "material", value: "canvas" },
    ],
    sizes: [
      { id: "size-1", name: "8 x 10", type: "size", value: "8x10" },
      {
        id: "size-2",
        name: "16 x 20",
        type: "size",
        value: "16x20",
        price: 50,
      },
      {
        id: "size-3",
        name: "24 x 36",
        type: "size",
        value: "24x36",
        price: 100,
      },
    ],
    styles: [
      { id: "style-1", name: "Print Only", type: "style", value: "print" },
      {
        id: "style-2",
        name: "Framed",
        type: "style",
        value: "framed",
        price: 75,
      },
    ],
  },
  "landscape-3": {
    id: "landscape-3",
    name: "Sunset Horizon",
    description: "Stunning sunset landscape capturing natures beauty",
    basePrice: 349.99,
    image: "/images/feature3.webp",
    details: "Stunning sunset landscape capturing nature's beauty.",
    collection: "landscapes",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      { id: "mat-3", name: "Canvas", type: "material", value: "canvas" },
    ],
    sizes: [
      { id: "size-1", name: "8 x 10", type: "size", value: "8x10" },
      {
        id: "size-2",
        name: "16 x 20",
        type: "size",
        value: "16x20",
        price: 50,
      },
      {
        id: "size-3",
        name: "24 x 36",
        type: "size",
        value: "24x36",
        price: 100,
      },
    ],
    styles: [
      { id: "style-1", name: "Print Only", type: "style", value: "print" },
      {
        id: "style-2",
        name: "Framed",
        type: "style",
        value: "framed",
        price: 75,
      },
    ],
  },
  "flora-fauna-1": {
    id: "flora-fauna-1",
    name: "Botanical Beauty",
    description: "Beautiful botanical art with delicate specimens",
    basePrice: 179.99,
    image: "/images/feature1.webp",
    details:
      "Beautiful botanical art featuring delicate flora specimens with intricate details.",
    collection: "flora-fauna",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      { id: "mat-3", name: "Canvas", type: "material", value: "canvas" },
    ],
    sizes: [
      { id: "size-1", name: "8 x 10", type: "size", value: "8x10" },
      {
        id: "size-2",
        name: "16 x 20",
        type: "size",
        value: "16x20",
        price: 50,
      },
      {
        id: "size-3",
        name: "24 x 36",
        type: "size",
        value: "24x36",
        price: 100,
      },
    ],
    styles: [
      { id: "style-1", name: "Print Only", type: "style", value: "print" },
      {
        id: "style-2",
        name: "Framed",
        type: "style",
        value: "framed",
        price: 75,
      },
    ],
  },
  "flora-fauna-2": {
    id: "flora-fauna-2",
    name: "Wildlife Majesty",
    description: "Wildlife artwork capturing the essence of nature",
    basePrice: 229.99,
    image: "/images/feature2.webp",
    details:
      "Wildlife artwork capturing the essence and beauty of natural fauna.",
    collection: "flora-fauna",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      { id: "mat-3", name: "Canvas", type: "material", value: "canvas" },
    ],
    sizes: [
      { id: "size-1", name: "8 x 10", type: "size", value: "8x10" },
      {
        id: "size-2",
        name: "16 x 20",
        type: "size",
        value: "16x20",
        price: 50,
      },
      {
        id: "size-3",
        name: "24 x 36",
        type: "size",
        value: "24x36",
        price: 100,
      },
    ],
    styles: [
      { id: "style-1", name: "Print Only", type: "style", value: "print" },
      {
        id: "style-2",
        name: "Framed",
        type: "style",
        value: "framed",
        price: 75,
      },
    ],
  },
  "flora-fauna-3": {
    id: "flora-fauna-3",
    name: "Garden Harmony",
    description: "Exquisite flora composition with vibrant colors",
    basePrice: 279.99,
    image: "/images/feature3.webp",
    details:
      "Exquisite flora composition with vibrant colors and botanical precision.",
    collection: "flora-fauna",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      { id: "mat-3", name: "Canvas", type: "material", value: "canvas" },
    ],
    sizes: [
      { id: "size-1", name: "8 x 10", type: "size", value: "8x10" },
      {
        id: "size-2",
        name: "16 x 20",
        type: "size",
        value: "16x20",
        price: 50,
      },
      {
        id: "size-3",
        name: "24 x 36",
        type: "size",
        value: "24x36",
        price: 100,
      },
    ],
    styles: [
      { id: "style-1", name: "Print Only", type: "style", value: "print" },
      {
        id: "style-2",
        name: "Framed",
        type: "style",
        value: "framed",
        price: 75,
      },
    ],
  },
  "women-series-1": {
    id: "women-series-1",
    name: "Strength & Grace",
    description: "Empowering artwork celebrating women",
    basePrice: 329.99,
    image: "/images/feature1.webp",
    details: "Empowering artwork celebrating the strength and beauty of women.",
    collection: "women-series",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      { id: "mat-3", name: "Canvas", type: "material", value: "canvas" },
    ],
    sizes: [
      { id: "size-1", name: "8 x 10", type: "size", value: "8x10" },
      {
        id: "size-2",
        name: "16 x 20",
        type: "size",
        value: "16x20",
        price: 50,
      },
      {
        id: "size-3",
        name: "24 x 36",
        type: "size",
        value: "24x36",
        price: 100,
      },
    ],
    styles: [
      { id: "style-1", name: "Print Only", type: "style", value: "print" },
      {
        id: "style-2",
        name: "Framed",
        type: "style",
        value: "framed",
        price: 75,
      },
    ],
  },
  "women-series-2": {
    id: "women-series-2",
    name: "Feminine Heritage",
    description: "Elegant portrayal of feminine grace and culture",
    basePrice: 379.99,
    image: "/images/feature2.webp",
    details: "Elegant portrayal of feminine grace and cultural heritage.",
    collection: "women-series",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      { id: "mat-3", name: "Canvas", type: "material", value: "canvas" },
    ],
    sizes: [
      { id: "size-1", name: "8 x 10", type: "size", value: "8x10" },
      {
        id: "size-2",
        name: "16 x 20",
        type: "size",
        value: "16x20",
        price: 50,
      },
      {
        id: "size-3",
        name: "24 x 36",
        type: "size",
        value: "24x36",
        price: 100,
      },
    ],
    styles: [
      { id: "style-1", name: "Print Only", type: "style", value: "print" },
      {
        id: "style-2",
        name: "Framed",
        type: "style",
        value: "framed",
        price: 75,
      },
    ],
  },
  "calligraphy-1": {
    id: "calligraphy-1",
    name: "Elegant Script",
    description: "Elegant calligraphy with traditional techniques",
    basePrice: 199.99,
    image: "/images/feature2.webp",
    details:
      "Elegant calligraphy with traditional techniques. Each piece is unique and hand-crafted.",
    collection: "calligraphy-contemporary",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      { id: "mat-3", name: "Canvas", type: "material", value: "canvas" },
    ],
    sizes: [
      { id: "size-1", name: "8 x 10", type: "size", value: "8x10" },
      {
        id: "size-2",
        name: "16 x 20",
        type: "size",
        value: "16x20",
        price: 50,
      },
      {
        id: "size-3",
        name: "24 x 36",
        type: "size",
        value: "24x36",
        price: 100,
      },
    ],
    styles: [
      { id: "style-1", name: "Print Only", type: "style", value: "print" },
      {
        id: "style-2",
        name: "Framed",
        type: "style",
        value: "framed",
        price: 75,
      },
    ],
  },
  "calligraphy-2": {
    id: "calligraphy-2",
    name: "Modern Fusion",
    description: "Modern contemporary piece blending traditions",
    basePrice: 249.99,
    image: "/images/feature3.webp",
    details:
      "Modern contemporary piece blending traditional and modern art styles.",
    collection: "calligraphy-contemporary",
    materials: [
      {
        id: "mat-1",
        name: "Lustre Photo Paper",
        type: "material",
        value: "lustre-photo",
      },
      {
        id: "mat-2",
        name: "Watercolor Fine Art Paper II",
        type: "material",
        value: "watercolor-ii",
      },
      { id: "mat-3", name: "Canvas", type: "material", value: "canvas" },
    ],
    sizes: [
      { id: "size-1", name: "8 x 10", type: "size", value: "8x10" },
      {
        id: "size-2",
        name: "16 x 20",
        type: "size",
        value: "16x20",
        price: 50,
      },
      {
        id: "size-3",
        name: "24 x 36",
        type: "size",
        value: "24x36",
        price: 100,
      },
    ],
    styles: [
      { id: "style-1", name: "Print Only", type: "style", value: "print" },
      {
        id: "style-2",
        name: "Framed",
        type: "style",
        value: "framed",
        price: 75,
      },
    ],
  },
};

export const getAllArtPieces = (): Product[] => {
  return Object.values(artPiecesDatabase);
};

export const getArtPiecesByCollection = (collection: string): Product[] => {
  return Object.values(artPiecesDatabase).filter(
    (piece) => piece.collection === collection,
  );
};

export const getArtPiece = (id: string): Product | undefined => {
  return artPiecesDatabase[id];
};
