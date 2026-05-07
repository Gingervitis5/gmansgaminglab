"use client";

import React, { useState } from "react";
import ImageView from "./ImageView";
import { urlFor } from "@/sanity/lib/image";
import { X } from "lucide-react";

interface ImageViewWithZoomProps {
  images: any[];
  isAvailable: string;
}

export default function ImageViewWithZoom({ images, isAvailable }: ImageViewWithZoomProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <ImageView
        images={images}
        isAvailable={isAvailable}
        onImageClick={(image) => image ? setSelectedImage(urlFor(image).url()) : null}
      />

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-7xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged product image"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
