"use client";

import { useImageUpload } from "@/src/hooks/useImageUpload";
import { Camera, X } from "lucide-react";
import Image from "next/image";

export interface ReviewImageUploaderProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ReviewImageUploader({
  images,
  setImages,
  setImageFiles,
}: ReviewImageUploaderProps) {
  const { fileInputRef, handleButtonClick, handleFileChange, removeImage } =
    useImageUpload(images, setImages, setImageFiles, 3);

  return (
    <div>
      <label className="block text-xs font-black tracking-widest text-black mb-3 uppercase">
        사진 첨부
      </label>

      <div className="grid grid-cols-4 gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />

        <button
          type="button"
          onClick={handleButtonClick}
          disabled={images.length >= 3}
          className="flex flex-col items-center justify-center w-full aspect-square border border-dashed border-gray-300 bg-gray-50 text-gray-400 hover:border-black hover:text-black cursor-pointer disabled:opacity-50 disabled:cursor-default"
        >
          <Camera size={24} strokeWidth={1.5} />
          <span className="text-[10px] font-bold mt-2 uppercase">
            {images.length} / {3}
          </span>
        </button>

        {[...Array(3)].map((_, i) => {
          const imageUrl = images[i];
          return (
            <div
              key={i}
              className="relative w-full aspect-square border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden"
            >
              {imageUrl ? (
                <>
                  <Image
                    src={imageUrl}
                    alt={`Preview ${i}`}
                    fill
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-0 right-0 bg-black text-white p-1 hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </>
              ) : (
                <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">
                  ready
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
