"use client"
import Image from "next/image";
import Carousel from './components/Carousel';
import Card from './components/Card';
import FeaturedCollection from './components/FeaturedCollection';

export default function Home() {
  const largeCard = {
    title: "Love Relationship Coaching",
    description: "If you are currently in a relationship or seeking for one, and if you are not experiencing the deep soulmate love that you are desiring, it is not your fault. Do you want to be absolutely clear about what is blocking you? Let's go ahead and do a quick 30-minute call.",
    imageSrc: "/images/red-bird.webp",
    link: "/coaching",
  };

  const cards = [
    {
      title: "Art Collection",
      description: "Explore a collection that speaks the universal language of love, connecting souls through vibrant colors and passionate strokes.",
      imageSrc: "/images/Conversation_between_Sun_Moon._jpg.webp",
      link: "/art-collection",
    },
    {
      title: "Love Relationship Coaching",
      description: "Follow my Unique Artist's Path Method to unlock your potential and become a dynamic magnet for an extraordinary life of happiness, passionate and steady love.",
      imageSrc: "/images/Love_at_first_sight.webp",
      link: "/coaching",
    },
    {
      title: "Product Catalog",
      description: "Express your artistic style with our collection of products featuring unique artwork. Wear your creativity with pride.",
      imageSrc: "/images/neck-shirt.webp",
      link: "/products",
    },
  ];

  const featuredItems = [
    {
      title: "SEEKING KNOWLEDGE Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/featured1.jpg",
    },
    {
      title: "SERENITY Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/featured2.jpg",
    },
    {
      title: "OCEAN SPIRIT Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/featured3.jpg",
    },
    {
      title: "EXPERIENCING GREATNESS Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/featured4.jpg",
    },
    {
      title: "EXPERIENCING GREATNESS Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/featured4.jpg",
    },
    {
      title: "EXPERIENCING GREATNESS Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/featured4.jpg",
    },
    {
      title: "EXPERIENCING GREATNESS Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/featured4.jpg",
    },
    {
      title: "EXPERIENCING GREATNESS Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/featured4.jpg",
    },{
      title: "EXPERIENCING GREATNESS Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/featured4.jpg",
    },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full lg:w-3/4">
          <Carousel />
        </div>

        <Card
          title={largeCard.title}
          description={largeCard.description}
          imageSrc={largeCard.imageSrc}
          link={largeCard.link}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <Card
            key={index}
            title={card.title}
            description={card.description}
            imageSrc={card.imageSrc}
            link={card.link}
            />
          ))}
        </div>

        {/* Centering the Featured Collection */}
        <div className="flex justify-center w-full">
          <FeaturedCollection items={featuredItems} />
        </div>

        {/* Other content... */}
      </main>
    </div>
  );
}
