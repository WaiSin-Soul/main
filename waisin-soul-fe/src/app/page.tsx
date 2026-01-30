"use client";
import Carousel from "./components/Carousel";
import Card from "./components/Card";
import FeaturedCollection from "./components/FeaturedCollection";

export default function Home() {
  const largeCard = {
    title: "Love Relationship Coaching",
    description:
      "If you are currently in a relationship or seeking for one, and if you are not experiencing the deep soulmate love that you are desiring, it is not your fault. Do you want to be absolutely clear about what is blocking you? Let's go ahead and do a quick 30-minute call.",
    imageSrc: "/images/red-bird.webp",
    link: "/coaching",
  };

  const cards = [
    {
      title: "Art Collection",
      description:
        "Explore a collection that speaks the universal language of love, connecting souls through vibrant colors and passionate strokes.",
      imageSrc: "/images/Conversation_between_Sun_Moon._jpg.webp",
      link: "/art/collection",
    },
    {
      title: "Love Relationship Coaching",
      description:
        "Follow my Unique Artist's Path Method to unlock your potential and become a dynamic magnet for an extraordinary life of happiness, passionate and steady love.",
      imageSrc: "/images/Love_at_first_sight.webp",
      link: "/coaching",
    },
    {
      title: "Product Catalog",
      description:
        "Express your artistic style with our collection of products featuring unique artwork. Wear your creativity with pride.",
      imageSrc: "/images/neck-shirt.webp",
      link: "/products",
    },
  ];

  const carouselItems = [
    { src: "/images/Ocean_Spirit.webp", alt: "Ocean spirit" },
    { src: "/images/Great_Taos_Way.webp", alt: "Great Taos Way" },
    {
      src: "/images/Celebration_of_Surrender.webp",
      alt: "Celebration of surrender",
    },
    { src: "/images/Joy_of_Aboundance.webp", alt: "Joy of aboundance" },
  ];

  const featuredItems = [
    {
      id: 'seeking-knowledge-laptop',
      title: "SEEKING KNOWLEDGE Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/images/feature1.webp",
    },
    {
      id: 'serenity-laptop',
      title: "SERENITY Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/images/feature2.webp",
    },
    {
      id: 'ocean-spirit-laptop',
      title: "OCEAN SPIRIT Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/images/feature3.webp",
    },
    {
      id: 'seeking-knowledge-laptop',
      title: "EXPERIENCING GREATNESS Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/images/feature4.webp",
    },
    {
      id: 'seeking-knowledge-laptop',
      title: "SEEKING KNOWLEDGE Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/images/feature1.webp",
    },
    {
      id: 'serenity-laptop',
      title: "SERENITY Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/images/feature2.webp",
    },
    {
      id: 'ocean-spirit-laptop',
      title: "OCEAN SPIRIT Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/images/feature3.webp",
    },
    {
      id: 'seeking-knowledge-laptop',
      title: "EXPERIENCING GREATNESS Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/images/feature4.webp",
    },
    {
      id: 'seeking-knowledge-laptop',
      title: "SEEKING KNOWLEDGE Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/images/feature1.webp",
    },
    {
      id: 'serenity-laptop',
      title: "SERENITY Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/images/feature2.webp",
    },
    {
      id: 'ocean-spirit-laptop',
      title: "OCEAN SPIRIT Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/images/feature3.webp",
    },
    {
      id: 'seeking-knowledge-laptop',
      title: "EXPERIENCING GREATNESS Laptop Sleeve",
      price: "$45.00 CAD",
      imageSrc: "/images/feature4.webp",
    },
  ];

  return (
    <div className="h-full mb-4 grid grid-rows items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full lg:w-full h-full">
          <Carousel items={carouselItems} />
        </div>
        <div className="mx-40">
          <Card
            title={largeCard.title}
            description={largeCard.description}
            imageSrc={largeCard.imageSrc}
            link={largeCard.link}
          />
        </div>
        <div className="my-8 w-full">
          <h1 className="font-kalam text-4xl font-bold mb-4 mx-40">Services</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-40">
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
