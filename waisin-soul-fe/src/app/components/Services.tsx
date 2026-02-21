import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageSrc, link }) => (
  <Link href={link} className="group">
    <div className="bg-[#2A2A2A] rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative h-64 w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-cursive mb-3">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
        <div className="mt-4 flex items-center">
          <span className="text-sm font-medium group-hover:underline">Check out</span>
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </div>
  </Link>
);

const Services = () => {
  const services = [
    {
      title: "Art Collection",
      description: "Explore a collection that speaks the universal language of love, connecting souls through vibrant colors and passionate strokes.",
      imageSrc: "/images/Conversation_between_Sun_Moon._jpg.webp",
      link: "/collection"
    },
    {
      title: "Love Relationship Coaching",
      description: "Follow my Unique Artist's Path Method to unlock your potential and become a dynamic magnet for an extraordinary life of happiness, passionate and steady love.",
      imageSrc: "/images/Love_at_first_sight.webp",
      link: "/coaching"
    },
    {
      title: "Product Catalog",
      description: "Express your artistic style with our collection of products featuring unique artwork. Wear your creativity with pride.",
      imageSrc: "/images/neck-shirt.webp",
      link: "/products"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8">
      <h2 className="text-3xl font-cursive mb-12 text-center">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default Services; 