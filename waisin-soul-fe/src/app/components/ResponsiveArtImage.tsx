"use client";
import React, { useState } from "react";
import Image from "next/image";

type ResponsiveArtImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
};

const ResponsiveArtImage = ({
  src,
  alt,
  className,
  imageClassName,
}: ResponsiveArtImageProps) => {
  const [ratio, setRatio] = useState<number | null>(null);

  return (
    <div
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      style={{ aspectRatio: ratio ? String(ratio) : "4 / 5" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className={
          imageClassName ??
          "object-contain transition-transform duration-300 hover:scale-105"
        }
        onLoadingComplete={(img) => {
          if (img.naturalWidth && img.naturalHeight) {
            setRatio(img.naturalWidth / img.naturalHeight);
          }
        }}
      />
    </div>
  );
};

export default ResponsiveArtImage;
