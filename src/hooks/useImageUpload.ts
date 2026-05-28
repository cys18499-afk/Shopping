import { useRef, ChangeEvent } from "react";
import { ReviewImageUploaderProps } from "../components/review/ReviewImageUploader";

/**
 *  @example const { images, fileInputRef, handleButtonClick, handleFileChange, removeImage } = useImageUpload(images, setImages, setImageFiles, 3));
 *  @param images - 화면에 보여줄 이미지 미리보기
 *  @param setImages - image 상태 업데이트
 *  @param setImageFiles - 실제 파일 객체
 *  @param maxImages - 업로드 가능한 최대 사진 장수
 */
export function useImageUpload(
  images: ReviewImageUploaderProps["images"],
  setImages: ReviewImageUploaderProps["setImages"],
  setImageFiles: ReviewImageUploaderProps["setImageFiles"],
  maxImages: number = 3,
) {
  // input class='hidden' 을 버튼으로 열기 위한 ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const availableSlots = maxImages - images.length;
    const filesToUpload = fileArray.slice(0, availableSlots);

    if (filesToUpload.length > 0) {
      setImageFiles((prev) => [...prev, ...filesToUpload]);

      const newImageUrls = filesToUpload.map((file) =>
        URL.createObjectURL(file),
      );
      setImages((prev) => [...prev, ...newImageUrls]);
    }

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const targetUrl = prev[index];
      if (targetUrl.startsWith("blob:")) URL.revokeObjectURL(targetUrl);
      return prev.filter((_, i) => i !== index);
    });

    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    images,
    fileInputRef,
    handleButtonClick,
    handleFileChange,
    removeImage,
    isMax: images.length >= maxImages,
  };
}
